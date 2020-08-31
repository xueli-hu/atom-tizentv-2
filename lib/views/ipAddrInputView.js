'use babel'
const etch = require('etch');

function checkIPAddress(value) {
    if (value == '') {
        return 'The IP address must be specified.'
    }

    let ipFrags = value.split('.');
    if (ipFrags.length != 4) {
        return 'Invalide IP address format.'
    }

    let incorrect = false;
    ipFrags.forEach(ip => {
        if (!matchReg(ip, /25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d/)) {
            incorrect = true;
        }
    })

    if (incorrect) {
        return 'Invalide IP address format.'
    }

    return null;
}

function matchReg(value, reg) {
    let match = value.match(reg);
    if (match != null) {
        if (match.length == 1 && match[0] == value) {
            return true;
        }
    }

    return false;
}

module.exports = class IpAddrInputView {
    constructor(props) {
        this.props = props;
        this.ipInputTips = '';
        etch.initialize(this);
    }

    render() {
        /** @jsx etch.dom */
        return (
            <div className='section-container' style='overflow: hidden'>
                <h1 className='section-heading block'>{this.props.head}</h1>
                <div className='block' style='margin-top: 5px'>
                    <label className='text-highlight' style='font-size: 15px'>{this.props.label}</label>
                    <input ref='ipInput' className='input-text native-key-bindings' type='text' placeholder='xxx.xxx.xxx.xxx' on={{focus: this.focusIpInput}}/>
                    <p className='text-error'>{this.ipInputTips}</p>
                </div>
                <div className='block' style='margin-top: 10px; float:right'>
                    <div className='inline-block btn-group'>
                        <button className='btn' disabled>{'< Back'}</button>
                        <button className='btn' on={{click: this.clickNextBtn}}>{'Next >'}</button>
                    </div>
                    <button className='inline-block btn' disabled>Finish</button>
                    <button className='inline-block btn' on={{click: this.clickCancelBtn}}>Cancel</button>
                </div>
            </div>
        )
    }

    update(props) {
        return etch.update(this);
    }

    async destroy() {
        await etch.destroy(this);
    }

    clickNextBtn() {
        if (this.refs.ipInput.value == '' || this.refs.ipInput.value == null) {
            this.ipInputTips = 'The ip address must be specified.';
            etch.update(this);
            return;
        }

        this.ipInputTips = checkIPAddress(this.refs.ipInput.value);
        if (this.ipInputTips != null) {
            etch.update(this);
            return;
        }

        this.props.onClickNextBtn();
        etch.update(this);
    }

    clickCancelBtn() {
        this.props.onClickCancelBtn();
    }

    focusIpInput() {
        if (this.ipInputTips != '') {
            this.ipInputTips = '';
            etch.update(this);
        }
    }

    getType() {
        return this.props.type;
    }

    getInfo() {
        return this.refs.ipInput.value;
    }
}