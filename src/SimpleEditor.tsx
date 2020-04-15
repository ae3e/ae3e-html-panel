import React, { PureComponent } from 'react';
import { PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { config } from '@grafana/runtime'

import { SimpleOptions } from './types';

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/theme/tomorrow';
import 'brace/theme/tomorrow_night';
import 'brace/theme/github';

export class SimpleEditor extends PureComponent<PanelEditorProps<SimpleOptions>> {
  onHtmlChanged = (evt: any, editor?) => {
    this.props.onOptionsChange({
      ...this.props.options,
      html: editor.getValue(),
    });
  };

  onScriptChanged = (evt: any, editor?) => {
    this.props.onOptionsChange({
      ...this.props.options,
      script: editor.getValue(),
    });
  };

  onTypeChanged = (evt: any) => { };

  render() {
    let theme = config.theme.isDark ? "tomorrow_night" : "tomorrow";

    return (

      <PanelOptionsGroup title="Options">
        <div className="section gf-form-group"  style={{ display: 'block', width: '100%' }}>
          <h5 className="section-heading">Html</h5>
          <div className="gf-form-inline"  style={{ display: 'block', width: '100%' }}>
            <div className="gf-form">
            <AceEditor
            mode="html"
            theme={theme}
            name="dashboard_onclick"
            height="150px"
            width="100%"
            value={this.props.options.html}
            onBlur={this.onHtmlChanged}
          />
            </div>
          </div>
        </div>

        <div className="section gf-form-group"  style={{ display: 'block', width: '100%' }}>
          <h5 className="section-heading">Script</h5>
          <div className="gf-form-inline"  style={{ display: 'block', width: '100%' }}>
            <div className="gf-form">
            <AceEditor
            mode="javascript"
            theme={theme}
            name="dashboard_script"
            height="150px"
            width="100%"
            value={this.props.options.script}
            onBlur={this.onScriptChanged}
          />
            </div>
          </div>
        </div>
      </PanelOptionsGroup>
    );
  }
}
