'use babel';

import ChronosView from './chronos-view';
import { CompositeDisposable } from 'atom';

export default {

  chronosView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.chronosView = new ChronosView(state.chronosViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.chronosView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'chronos:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.chronosView.destroy();
  },

  serialize() {
    return {
      chronosViewState: this.chronosView.serialize()
    };
  },

  toggle() {
    console.log('Chronos was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
