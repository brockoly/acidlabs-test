import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Spinner from '../Spinner/Spinner';

ReactModal.setAppElement('#root');

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
      loading: props.loading,
    }
  }


  render() {
    return (
      <div>
        {
          this.props.loading
            ?
            <Spinner />
            :
            <ReactModal
              isOpen={this.props.isOpen}
              contentLabel="onRequestClose Example"
              onRequestClose={() => this.props.closeModal()}
              className="Modal"
              overlayClassName="Overlay"
            >
              {
                this.props.error
                  ?
                  <div className="modal-content">
                    <div>Error: {this.props.error}</div>
                    <button className="modal-button" onClick={() => this.props.closeModal()}>Cerrar</button>
                  </div>
                  :
                  <div className="modal-content">
                    <div>País: {this.props.country}</div>
                    <div>Capital: {this.props.capital}</div>
                    <div>Temperatura: {this.props.temperature} ℃</div>
                    <button className="modal-button" onClick={() => this.props.closeModal()}>Cerrar</button>
                  </div>
              }
            </ReactModal>
        }
      </div>
    );
  }
}

export default Modal;