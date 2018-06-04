import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Row, Col, Form, Input, Button,notification } from 'antd';

import './style.less';

class TasksItem extends React.Component {
    constructor(props) {
        super(props)
        this.createItem = this.createItem.bind(this)
        this.loginItem = this.loginItem.bind(this)
        this.logoutItem = this.logoutItem.bind(this)
        this.depositItem = this.depositItem.bind(this)
        this.withdrawItem = this.withdrawItem.bind(this)
        this.getBalanceItem = this.getBalanceItem.bind(this)
    }

    createItem(e) {
        e.preventDefault()

        let elementName = ReactDOM.findDOMNode(this.refs.createName)
        let elementPasswd = ReactDOM.findDOMNode(this.refs.createPasswd)
        if (!elementName.value) {
            notification.open({
                description : 'account name can not be empty',
            })
        } else if (!elementPasswd.value) {
            notification.open({
                description : 'account passwd can not be empty',
            })
        } else {

            // actual action from SimpleTask.jsx, by props
            this.props.handleCreate(elementName.value, elementPasswd.value)
            elementName.value = ""
            elementPasswd.value = ""
        }
    }

    loginItem(e) {
        e.preventDefault()

        let elementName = ReactDOM.findDOMNode(this.refs.loginName)
        let elementPasswd = ReactDOM.findDOMNode(this.refs.loginPasswd)
        if (!elementName.value) {
            notification.open({
                description : 'account name can not be empty',
            })
        } else if (!elementPasswd.value) {
            notification.open({
                description : 'account passwd can not be empty',
            })
        } else {
            this.props.handleLogin(elementName.value, elementPasswd.value)
            elementName.value = ""
            elementPasswd.value = ""
        }
    }

    logoutItem(e) {
        e.preventDefault()

        let elementName = ReactDOM.findDOMNode(this.refs.logoutName)
        let elementPasswd = ReactDOM.findDOMNode(this.refs.logoutPasswd)
        if (!elementName.value) {
            notification.open({
                description : 'account name can not be empty',
            })
        } else if (!elementPasswd.value) {
            notification.open({
                description : 'account passwd can not be empty',
            })
        } else {
            this.props.handleLogout(elementName.value, elementPasswd.value)
            elementName.value = ""
            elementPasswd.value = ""
        }
    }

    depositItem(e) {
        e.preventDefault()

        let elementTo = ReactDOM.findDOMNode(this.refs.depositTo)
        let elementQuantity = ReactDOM.findDOMNode(this.refs.depositQuantity)
        if (!elementTo.value) {
            notification.open({
                description : 'account name can not be empty',
            })
        } else if (!elementQuantity.value) {
            notification.open({
                description : 'quantity can not be empty',
            })
        } else {
            this.props.handleDeposit(elementTo.value, elementQuantity.value)
            elementTo.value = ""
            elementQuantity.value = ""
        }
    }

    withdrawItem(e) {
        e.preventDefault()

        let elementFrom = ReactDOM.findDOMNode(this.refs.withdrawFrom)
        let elementQuantity = ReactDOM.findDOMNode(this.refs.withdrawQuantity)
        if (!elementFrom.value) {
            notification.open({
                description : 'account name can not be empty',
            })
        } else if (!elementQuantity.value) {
            notification.open({
                description : 'quantity can not be empty',
            })
        } else {
            this.props.handleWithdraw(elementFrom.value, elementQuantity.value)
            elementFrom.value = ""
            elementQuantity.value = ""
        }
    }

    getBalanceItem(e) {
        e.preventDefault()

        let elementName = ReactDOM.findDOMNode(this.refs.getBalanceName)
        let elementPasswd = ReactDOM.findDOMNode(this.refs.getBalancePasswd)
        if (!elementName.value) {
            notification.open({
                description : 'account name can not be empty',
            })
        } else if (!elementPasswd.value) {
            notification.open({
                description : 'account passwd can not be empty',
            })
        } else {
            this.props.handleGetBalance(elementName.value, elementPasswd.value)
            elementName.value = ""
            elementPasswd.value = ""
        }
    }

    render() {
        return (
            <div className="simpletskitem">
                <Form.Item>
                    <Input id="createName" ref="createName" type="text" placeholder="account name~"></Input>
                    <Input id="createPasswd" ref="createPasswd" type="text" placeholder="account passwd~"></Input>
                    <Button type="primary" className="pull-right" onClick={this.createItem}>&nbsp;&nbsp;&nbsp;&nbsp;Create&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </Form.Item>
                <Form.Item>
                    <Input id="loginName" ref="loginName" type="text" placeholder="account name~"></Input>
                    <Input id="loginPasswd" ref="loginPasswd" type="text" placeholder="account passwd~"></Input>
                    <Button type="primary" className="pull-right" onClick={this.loginItem}>&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </Form.Item>
                <Form.Item>
                    <Input id="logoutName" ref="logoutName" type="text" placeholder="account name~"></Input>
                    <Input id="logoutPasswd" ref="logoutPasswd" type="text" placeholder="account passwd~"></Input>
                    <Button type="primary" className="pull-right" onClick={this.logoutItem}>&nbsp;&nbsp;&nbsp;Logout&nbsp;&nbsp;&nbsp;&nbsp;</Button>
                </Form.Item>
                <Form.Item>
                    <Input id="depositTo" ref="depositTo" type="text" placeholder="deposit to~"></Input>
                    <Input id="depositQuantity" ref="depositQuantity" type="text" placeholder="deposit quantity~"></Input>
                    <Button type="primary" className="pull-right" onClick={this.depositItem}>&nbsp;&nbsp;&nbsp;Deposit&nbsp;&nbsp;&nbsp;</Button>
                </Form.Item>
                <Form.Item>
                    <Input id="withdrawFrom" ref="withdrawFrom" type="text" placeholder="withdraw from~"></Input>
                    <Input id="withdrawQuantity" ref="withdrawQuantity" type="text" placeholder="withdraw quantity~"></Input>
                    <Button type="primary" className="pull-right" onClick={this.withdrawItem}>&nbsp;Withdraw&nbsp;&nbsp;</Button>
                </Form.Item>
                <Form.Item>
                    <Input id="getBalanceName" ref="getBalanceName" type="text" placeholder="account name~"></Input>
                    <Input id="getBalancePasswd" ref="getBalancePasswd" type="text" placeholder="account passwd~"></Input>
                    <Button type="primary" className="pull-right" onClick={this.getBalanceItem}>GetBalance</Button>
                </Form.Item>
            </div>
        )
    }
}

export default TasksItem;