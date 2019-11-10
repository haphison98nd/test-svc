import React, { Component } from 'react';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            isLoaded: false,
            response: [],
            value: '',
            isShowButton: false,
            currentPage : 1,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }


    handleChange(event){
        this.setState({
            value : event.target.value,
            currentPage : 1,
            isShowButton: false,
            response: [],
        });
    }

    handleSubmit() {
        
        fetch("https://api.github.com/users/" + this.state.value + "/repos" + "?page=" + this.state.currentPage)
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    // console.log(this.state.response);
                    this.setState({
                        isLoaded: true,
                        response: this.state.response.concat(result),
                        currentPage: this.state.currentPage+1,
                    });
                    this.handleCheck();
                    // console.log(this.state.response);
                },
                
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    handleCheck(){
        // let elmButton= null;
        // this.setState({currentPage:this.state.currentPage+1});
        fetch("https://api.github.com/users/" + this.state.value + "/repos" + "?page=" + this.state.currentPage)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isShowButton: result.length !==0 
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        // let response = this.state.response;
        let { error, isLoaded, response } = this.state;
        let elmButton, elmError, emlLoading, elmCount, elmList = null;

        elmCount = <div> {this.state.response.length} </div>;
        
        if (this.state.isShowButton == true) {
            elmButton = <button onClick={this.handleSubmit} type="button" className="btn btn-success showmore"> Show More </button>;
        }
        // console.log(this.state.isShowButton);
        if (error) {
            // elmError =  <div> Error: ko tim thay user </div>;
            // elmList = '';
            console.log(error.message);
        }
        else if (!isLoaded) {
            elmButton = '';
            elmList = '';
        }
        else{
            elmList = (
                <ul className="list-repo">
                {response.map(item => (
                    <li key={item.name}>
                        {item.full_name}
                    </li>
                ))}

                </ul> 
            )
        }
        return (
            <div className="container wrapper">
                <div className="form-inpt">
                    <form>
                        <label>
                            Name:
                            <input className="username" type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input className="btn-submit btn-success" type="button" onClick={this.handleSubmit} value="Submit" />
                    </form>

                </div>
                {elmError}
                <div>
                    {elmList}
                    
                </div>
                {emlLoading}
                {elmButton}

            </div>
        ); 
    }
}
export default App;