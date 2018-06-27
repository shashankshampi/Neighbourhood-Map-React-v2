/* *****************************
   **Developed and Designed By** 
   ********shashank sanket******
*/

import React, {Component} from 'react';

class Complex extends Component {
    constructor() {
        super();
        this.state = {
            pointer: [],
            queue: ''
        };
    }
    componentDidMount() {
        this.setState({pointer: this.props.virtualMarker});
    }
    // pattern matcing and searching the required match
    search = (e) => {
        const queue = e.target.value.toLowerCase();
        const pointer = this.props.virtualMarker;
        const mPoint = [];
	//Filtering the required pointer based on search
        pointer.forEach(function (m) {
            if (m.title.toLowerCase().indexOf(queue.toLowerCase()) >= 0) {
                m.setVisible(true);
                mPoint.push(m);
            } else {
                m.setVisible(false);
            }
        });

        this.setState({pointer: mPoint});
    }
    OPointer(m) {
        this.props.openInfo(m);
    }
    render() {
        return (
            <div>
               <div onClick={this.open}> </div>
               <div>
                  <div className="search" role="form">
                     <input type="text" placeholder="Filter By Places" onChange={this.search}/>
                  </div>
                  <ul>
                     {this.state.pointer && this.state.pointer.length && this.state.pointer.map((m, i) => <li key={i}>
                     <a href="#" onKeyPress={this.props.openInfo.bind(this, m)} onClick={this.props.openInfo.bind(this, m)}
                      tabIndex="0" role="button">{m.title}</a>
                     </li>
                   )}
                </ul>
             </div>
           </div>
        );
    }
}//close of Complex class
export default Complex;
