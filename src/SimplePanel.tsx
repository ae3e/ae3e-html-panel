import React, { PureComponent } from 'react';
import { PanelProps  } from '@grafana/data';
import { getLocationSrv } from '@grafana/runtime'
import { SimpleOptions } from 'types';

import _ from 'lodash'

declare global {
  interface Window {
    updateVariables: any;
  }
}
window.updateVariables = getLocationSrv().update;

interface Props extends PanelProps<SimpleOptions> {}
interface State {
  html:string
  htmlNode : any
}
  
let f = new Function('','return "Error"');

export class SimplePanel extends PureComponent<Props,State> {
  constructor(props: Props) {
    super(props);
    console.log('HTML Constructor')
    this.state = {
      html: props.options.html,
      htmlNode : React.createRef()
    };
    
    f = new Function('ctxt,html',this.props.options.script);
  }

  componentDidMount(){
    console.log('Component did mount');
    this.updateHTML();
    this.updateHTMLWithScript();
  }

  updateHTML = () => {

    //https://www.npmjs.com/package/dangerously-set-html-content
    const slotHtml = document.createRange().createContextualFragment(this.props.options.html) // Create a 'tiny' document and parse the html string
    this.state.htmlNode.current.innerHTML = '' // Clear the container
    this.state.htmlNode.current.appendChild(slotHtml) // Append the new content
    
  };

  updateHTMLWithScript = () =>{
    try{
      f(this.props,this.state.htmlNode.current);
    }catch(e){
      console.log(e)
    }
    
    console.log(this.props)
  }
  
  componentDidUpdate(prevProps: Props) {
    
    // Since any change could be referenced in a template variable,
    // This needs to process everytime (with debounce)
    if (this.props.options.html !== prevProps.options.html) {
      this.updateHTML();
    }
    if (this.props.options.script !== prevProps.options.script) {
      try{
        f = new Function('ctxt,html',this.props.options.script)
      }catch(e){
        console.log(e)
      }
    }
    this.updateHTMLWithScript();
  }

  render() {
  
    return (
      <div style={{
          width: '100%',
          height: '100%',
        }}
        ref={this.state.htmlNode} />
    );
  }
}
