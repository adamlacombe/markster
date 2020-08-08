import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { addMarks } from '../../add-marks.worker';

@Component({
  tag: 'mark-ster'
})
export class Markster {

  @Prop() text: string;
  @Prop() searchWords: string;

  @State() markedText: string = "";

  componentWillLoad() {
    this.applyMarks();
  }

  @Watch('text')
  @Watch('searchWords')
  async applyMarks() {
    this.markedText = await addMarks(this.text, this.searchWords);
  }

  render() {
    return <Host><span innerHTML={this.markedText} /></Host>;
  }
}
