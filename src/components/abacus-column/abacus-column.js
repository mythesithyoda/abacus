import React, { Component } from 'react';
import Bead from './abacus-bead/abacus-bead';

class AbacusColumn extends Component {
	state = {
		top: 0,
		bottom: 0,
		numBeads: 0
	}

	componentDidMount() {
		if (this.props.numBeads) {
			this.setState({bottom: this.props.numBeads, numBeads: this.props.numBeads});
		}
	}

	addTopHandler(howMany = 1) {
		let currTop = this.state.top;
		const max = this.state.numBeads;
		currTop += howMany;
		if (currTop < 0) {
			currTop = 0;
		}
		if (currTop >= max) {
			currTop = max;
		}
		let currBottom = this.state.bottom;
		currBottom -= howMany;
		if (currBottom < 0) {
			currBottom = 0;
		}
		if (currBottom >= max) {
			currBottom = max;
		}
		this.setState({bottom: currBottom, top: currTop});
		this.props.updateTotal(currTop, this.props.columnNum);
	}

	addBottomHandler(howMany = 1) {
		let currBottom = this.state.bottom;
		const max = this.state.numBeads;
		currBottom += howMany;
		if (currBottom < 0) {
			currBottom = 0;
		}
		if (currBottom >= max) {
			currBottom = max;
		}
		let currTop = this.state.top;
		currTop -= howMany;
		if (currTop < 0) {
			currTop = 0;
		}
		if (currTop >= max) {
			currTop = max;
		}
		this.setState({bottom: currBottom, top: currTop});
		this.props.updateTotal(currTop, this.props.columnNum);
	}

	render() {
		const bottom = this.state.bottom;
		const top = this.state.top;
		const bottomArr = [];
		const topArr = [];

		for (let i = 0; i < bottom; i++) {
			bottomArr.push(<Bead maxBottom={bottom-1} maxTop={top-1} key={i} columnNum={this.props.columnNum} position={i} bottom={true} addTop={this.addTopHandler.bind(this)} addBottom={this.addBottomHandler.bind(this)}/>);
		}

		for (let i = 0; i < top; i++) {
			topArr.push(<Bead maxBottom={bottom-1} maxTop={top-1} key={i} columnNum={this.props.columnNum} position={i} bottom={false} addTop={this.addTopHandler.bind(this)} addBottom={this.addBottomHandler.bind(this)}/>);
		}

		return (
			<div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6 abacus-column">
				<div id={'top-' + this.props.columnNum} className="top-beads">
					{topArr}
				</div>
				<div id={'bottom-' + this.props.columnNum} className="bottom-beads">
					{bottomArr}
				</div>
				<div className="middleBar"></div>
				<div><span onClick={() => this.addBottomHandler()} className="minus">-</span><span onClick={() => this.addTopHandler()} className="plus">+</span></div>
			</div>
		);
	}

}

export default AbacusColumn;