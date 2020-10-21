import React from 'react'
import { createPortal }  from 'react-dom'
import PropTypes from 'prop-types'
import './index.scss'

class Modal extends React.PureComponent{
    render() {
        const { 
            children, 
            closeIMG, 
            modalStyle = {}, 
            contentStyle = {}, 
            visible = true, 
            root,
            maskStyle = {}, 
            closeIMGStyle = {}, 
            animationType
        } = this.props
        return createPortal(
            <div className={`modal-container ${visible ? '' : 'hide'}`} style={ modalStyle }>
                <div className="mask" style={ maskStyle } onClick={this.handleClose}></div>
                <div className="modal-content" style={contentStyle}>
                    {
                        closeIMG && <img src={closeIMG} alt="closeIMG" onClick={this.handleClose} style={ closeIMGStyle }></img>
                    }
                    { children }
                </div>
            </div>
            ,root ? document.querySelector(root) : document.body
        )
    }

    handleClose = () => {
        this.props.onCancel ? this.props.onCancel() : ''
    }

    static propTypes = {
        title: PropTypes.string,
        visible: PropTypes.bool,
        closeIMG: PropTypes.string,
        contentStyle: PropTypes.object,
        onCancel: PropTypes.func,
        maskStyle: PropTypes.object,
        closeIMGStyle: PropTypes.object,
        animationType: PropTypes.string
    }
}

export default Modal