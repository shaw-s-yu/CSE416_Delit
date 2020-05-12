import React from 'react';

class Titlebar extends React.Component {

    state = {
        open: []
    }


    componentDidMount() {
        const { data } = this.props;
        let open = []
        for (let i = 0; i < data.length; i++)
            open.push(data[i].open)
        this.setState({ open })
    }

    handleClick = (index) => {
        let { open } = this.state;
        open = open.map((e, i) => {
            if (i === index) return e;
            else return false;
        });
        open[index] = !open[index];
        this.setState({ open: open });
    }

    handleAddProperty = () => {
        let open = this.state.open.map((e, i) => {
            if (i === 1) return true
            else return false
        })
        this.setState({ open })
    }

    componentWillMount() {
        if (this.props.childRef)
            this.props.childRef(this)
    }

    render() {

        const { data, maxHeight, resizing } = this.props;
        const { open } = this.state;

        return (
            <div className="collapsible-wrapper">
                {
                    data && data.map((d, index) => {
                        const style = {
                            maxHeight: open[index] ? maxHeight : '0px',
                            transition: resizing ? 'none' : !open[index] ? 'ease-in-out 0.3s' : 'ease-in-out 0.4s',
                        }
                        return (
                            <div key={index} >
                                <div
                                    className="collapsible-title"
                                    onClick={() => this.handleClick(index)}
                                    onMouseDown={e => e.stopPropagation()}
                                >
                                    <i className={open[index] ? 'collapsible-title-icon fas fa-chevron-right' : 'collapsible-title-icon fas fa-chevron-down'}></i>
                                    {d.title}
                                </div>
                                <div className={"collapsible-content "} style={style}>
                                    {d.content}
                                </div>
                            </div>
                        )
                    })
                }

            </div >
        )
    }
}

export default Titlebar;

