import React from 'react';
import {connect} from "react-redux";
import * as handler from "../../store/database/WorkScreenHandler";

class Collapsible extends React.Component {

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

    handleClick = (index, item, type) => {
        let { open } = this.state;
        open = open.map((e, i) => {
            if (i === index) return e;
            else return false;
        });
        open[index] = !open[index];
        this.setState({ open: open }, () => {
            if (type === "tileset") {
                this.props.passSelectedTileset(item)
            }else {
                this.props.passSelectedTileset(null)
            }
        });
    }

    handleAddProperty = () => {
        let open = this.state.open.map((e, i) => {
            if (i === 1) return true
            else return false
        })
        this.setState({ open })
    }

    UNSAFE_componentWillMount() {
        if (this.props.childRef)
            this.props.childRef(this)
    }

    handleUnfocus = () => {
        console.log("unfocus");
        this.props.passSelectedTileset(null);
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
                            <div key={index} tabIndex="0" className="collapsible-wrapper" onBlur={this.handleUnfocus}>
                                <div
                                    className="collapsible-title"
                                    onClick={() => this.handleClick(index, d.item, d.type)}
                                    onMouseDown={e => e.stopPropagation()}

                                >
                                    <i className={open[index] ? 'collapsible-title-icon fas fa-chevron-right' : 'collapsible-title-icon fas fa-chevron-down'}/>
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
const mapStateToProps = (state) => {
    return{}
};
const mapDispatchToProps = (dispatch) => ({
    passSelectedTileset: (selectedItem) => dispatch(handler.passSelectedTileset(selectedItem))
});
export default connect(mapStateToProps, mapDispatchToProps)(Collapsible)

