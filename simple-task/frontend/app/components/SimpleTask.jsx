import React, { Component } from 'react';
import {Card, notification} from 'antd';
import EOS from 'eosjs'

import TasksItem from './TasksItem'

const EOS_CONFIG = {
    contractName: "sim", // Contract name
    contractSender: "sim", // User executing the contract (should be paired with private key)
    clientConfig: {
      keyProvider: '5Ka4JTxz7fgcqbP9h12tcTxURiKJj4aiwakUZzwrQKCBWh9cqxM', // Your private key
      httpEndpoint: 'http://127.0.0.1:8888' // EOS http endpoint
    }
}

class SimpleTask extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            status: 1,  // 0: false, 1: success, 2: loading, 3: balance
            balance: 0  // getBalance & render
        }

        this.createAccount = this.createAccount.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.deposit = this.deposit.bind(this);
        this.withdraw = this.withdraw.bind(this);
        this.getBalance = this.getBalance.bind(this);

        // Initialize EOS
        this.eosClient = EOS.Localnet(EOS_CONFIG.clientConfig)
    }

    // componentDidMount() {}

    createAccount(name, passwd) {
        this.setState({status : 2})
        this.eosClient.contract(EOS_CONFIG.contractName).then((contract) => {
            contract.create(
                name,
                parseInt(passwd),
                { authorization : [EOS_CONFIG.contractSender] }
            ).then((res) => { this.setState({ status : 1 }) }).catch((err) => {

                // catch err
                this.setState({ status : 0 });
                console.log(err);
                if (err.indexOf("owner with symbol already exists") > 0) {
                    notification.open({
                        description: 'owner with symbol already exists'
                    })
                }
            })
        })
    }

    login(name, passwd) {
        this.setState({status : 2})
        this.eosClient.contract(EOS_CONFIG.contractName).then((contract) => {
            contract.login(
                name,
                parseInt(passwd),
                { authorization : [EOS_CONFIG.contractSender] }
            ).then((res) => { this.setState({ status : 1 }) }).catch((err) => {

                // catch err
                this.setState({ status : 0 });
                console.log(err);
                if (err.indexOf("user does not exist") > 0) {
                    notification.open({
                        description: 'user does not exist'
                    })
                }
                if (err.indexOf("passwd error") > 0) {
                    notification.open({
                        description: 'passwd error'
                    })
                }
            })
        })
    }

    logout(name, passwd) {
        this.setState({status : 2})
        this.eosClient.contract(EOS_CONFIG.contractName).then((contract) => {
            contract.logout(
                name,
                parseInt(passwd),
                { authorization : [EOS_CONFIG.contractSender] }
            ).then((res) => { this.setState({ status : 1 }) }).catch((err) => {

                // catch err
                this.setState({ status : 0 });
                console.log(err);
                if (err.indexOf("user does not exist") > 0) {
                    notification.open({
                        description: 'user does not exist'
                    })
                }
                if (err.indexOf("passwd error") > 0) {
                    notification.open({
                        description: 'passwd error'
                    })
                }
            })
        })
    }

    deposit(to, quantity) {
        this.setState({status : 2})
        if (quantity.charAt(0) === '-') {
            notification.open({
                description: 'quantity must be positive'
            })
            this.setState({status : 0})
        } else {
            this.eosClient.contract(EOS_CONFIG.contractName).then((contract) => {
                contract.deposit(
                    to,
                    quantity,
                    { authorization : [EOS_CONFIG.contractSender] }
                ).then((res) => { this.setState({ status : 1 }) }).catch((err) => {

                    // catch err
                    this.setState({ status : 0 });
                    console.log(err)
                    if (err.indexOf("user does not exist") > 0) {
                        notification.open({
                            description: 'user does not exist'
                        })
                    }
                    if (err.indexOf("login first please") > 0) {
                        notification.open({
                            description: 'login first please'
                        })
                    }
                })
            })
        }
    }

    withdraw(from, quantity) {
        this.setState({status : 2})
        this.eosClient.contract(EOS_CONFIG.contractName).then((contract) => {
            contract.withdraw(
                from,
                quantity,
                { authorization : [EOS_CONFIG.contractSender] }
            ).then((res) => { this.setState({ status : 1 }) }).catch((err) => {

                // catch err
                this.setState({ status : 0 });
                console.log(err)
                if (err.indexOf("user does not exist") > 0) {
                    notification.open({
                        description: 'user does not exist'
                    })
                }
                if (err.indexOf("login first please") > 0) {
                    notification.open({
                        description: 'login first please'
                    })
                }
                if (err.indexOf("overdrawn balance") > 0) {
                    notification.open({
                        description: 'overdrawn balance'
                    })
                }
            })
        })
    }

    getBalance(name, passwd) {
        this.setState({status : 2})

        // make sure the account is legal
        this.eosClient.contract(EOS_CONFIG.contractName).then((contract) => {
            contract.getbalance(
                name,
                parseInt(passwd),
                { authorization : [EOS_CONFIG.contractSender] }
            ).then((res) => {

                // cleos get table sim sim accounts
                this.eosClient.getTableRows(true, 'sim', 'sim', 'accounts').then((data) => {
                    console.log(data);
                    let list = data.rows;
                    for (let item of list) {
                        if (item.user === name) {
                            console.log(item.balance)
                            this.setState({ balance : item.balance})
                        }
                    }
                    this.setState({ status : 3 });
                }).catch((e) => {
                    this.setState({ status : 0 });
                    console.error(e); 
                })

            }).catch((err) => {

                // catch err
                this.setState({ status : 0 });
                console.log(err)
                if (err.indexOf("user does not exist") > 0) {
                    notification.open({
                        description: 'user does not exist'
                    })
                }
                if (err.indexOf("passwd error") > 0) {
                    notification.open({
                        description: 'passwd error'
                    })
                }
                if (err.indexOf("login first please") > 0) {
                    notification.open({
                        description: 'login first please'
                    })
                }
            })
        })
    }

    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px'}}>
                <Card title="Tasks" bordered={false} style={{ width: 500 }}>
                    <TasksItem  handleCreate={this.createAccount}
                                handleLogin={this.login}
                                handleLogout={this.logout}
                                handleDeposit={this.deposit}
                                handleWithdraw={this.withdraw}
                                handleGetBalance={this.getBalance}/>
                    <div style={{ float: 'right' }}>
                        {   this.state.status === 0 ? <strong>false</strong> :
                            this.state.status === 1 ? <strong>success</strong> :
                            this.state.status === 2 ? <strong>loading...</strong> : <strong>{this.state.balance}</strong>}
                    </div>
                </Card>
            </div>
        )
    }
}

export default SimpleTask