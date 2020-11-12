import React from 'react'
// import { Modal } from 'antd'
import Modal from '../../components/modal'
import './index.scss'
 
export default class BlogIndex extends React.Component {

    state = {
        visible: false
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
    hideModal = () => {
      this.setState({
        visible: false,
      });
    };
    render(){
        return (
            <div className="blog-container">
                <p onClick={this.showModal}>BlogIndex</p>
                <Modal 
                    title="Modal"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    >
                      <div className="blog-modal-content">
                        <p>Bla bla ...</p>
                        <p>Bla bla ...</p>
                        <p>Bla bla ...</p>
                      </div>
                    
                </Modal>
            </div>
        )
    }
}