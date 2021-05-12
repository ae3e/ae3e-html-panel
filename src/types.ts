export interface SimpleOptions {
  script: string;
  html:string;
}

export const defaults: SimpleOptions = {
  script: `console.log(ctxt)
//document.getElementById('myval').innerHTML=ctxt.data.series[0].fields[1].values.buffer[0]
html.querySelector('#myval').innerHTML=ctxt.data.series[0].fields[1].values.data.values[0]`,
  html:`Value : <span id="myval">Test</span>`
};
