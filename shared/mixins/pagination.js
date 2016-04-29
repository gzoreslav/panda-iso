export default {
    getInitialState() {
        return {
            min: (this.props.activePage - 1) * this.props.itemsPerPage,
            max: this.props.activePage * this.props.itemsPerPage - 1
        }
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            min: (nextProps.activePage  - 1) * nextProps.itemsPerPage,
            max: nextProps.activePage * nextProps.itemsPerPage - 1
        });
    },
    checkPage(itemIndex) {
        return (itemIndex >= (this.state.min || 0)) && (itemIndex <= (this.state.max || 0));
    }
};
