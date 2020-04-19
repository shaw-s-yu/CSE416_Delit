import React from 'react';
import Icon from 'react-materialize/lib/Icon';

class Titlebar extends React.Component {


    UNSAFE_componentWillMount() {
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

    render() {

        const { data, maxHeight, resizing } = this.props;
        const { open } = this.state;

        return (
            <div className="collapsible-wrapper">
                {
                    data && data.map((d, index) => {
                        const style = {
                            maxHeight: open[index] ? maxHeight : '0px',
                            transition: resizing ? 'none' : 'ease-out 0.5s',
                        }
                        return (
                            <div key={index} >
                                <div
                                    className="collapsible-title"
                                    onClick={() => this.handleClick(index)}
                                    onMouseDown={e => e.stopPropagation()}
                                >
                                    {d.title}
                                    <Icon small className="collapsible-title-icon">{open[index] ? 'chevron_right' : 'keyboard_arrow_down'}</Icon>
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
