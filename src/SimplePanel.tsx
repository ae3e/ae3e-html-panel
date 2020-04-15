import React, { PureComponent } from 'react';
import { PanelProps,DataSourceApi  } from '@grafana/data';
import {getDataSourceSrv } from '@grafana/runtime'
import { SimpleOptions } from 'types';

import _ from 'lodash'

//declare plolty as global
declare global {
  interface Window {
    updateVariable: any;
  }
}

let dataSource:any = getDataSourceSrv() as unknown as DataSourceApi;
window.updateVariable=function(varname:string, path:string) {
  console.log('update variable', varname, path );
  let v = _.find(dataSource.templateSrv.variables, check => {
    return check.name === varname;
  });
  console.log(v);
  if(v) {
    v.variableSrv.setOptionAsCurrent(v, {
      text: path,
      value: path,
    });
    v.variableSrv.variableUpdated(v, true);
  }
}

interface Props extends PanelProps<SimpleOptions> {}
interface State {
  html:string
  htmlNode : any
}
  
let f = new Function('','return "Error"');

export class SimplePanel extends PureComponent<Props,State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      html: props.options.html,
      htmlNode : React.createRef()
    };

    

    this.refresh()
  }

  componentDidMount(){
    const slotHtml = document.createRange().createContextualFragment(this.props.options.html) // Create a 'tiny' document and parse the html string
    this.state.htmlNode.current.innerHTML = '' // Clear the container
    this.state.htmlNode.current.appendChild(slotHtml) // Append the new content
  }

  updateHTML = () => {
    try{
      f(this.props,this.state.htmlNode);
    }catch(e){
      console.log(e)
    }
    
    console.log(this.props)
  };

  refresh = () => {
    f = new Function('ctxt,html',this.props.options.script)
  };
  
  componentDidUpdate(prevProps: Props) {
    
    // Since any change could be referenced in a template variable,
    // This needs to process everytime (with debounce)
    this.updateHTML();
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
