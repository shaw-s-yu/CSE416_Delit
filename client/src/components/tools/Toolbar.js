import React from 'react';
import './tools.css'
import { connect } from 'react-redux';
import * as handler from '../../store/database/WorkScreenHandler';

class Toolbar extends React.Component {

    stopPropagation = e => {
        e.stopPropagation();
    }

    handleSelect = (item, e) => {
        e.stopPropagation();

        if (item.disable === true) return

        if (this.props.selectCallback) {
            this.props.selectCallback()
        }

        this.props.handleUnselect();

        const { selected } = this.props
        if (selected !== item.name)
            this.props.handleSelect(item.name);
    }

    handleClick = e => {
        let { target } = e
        if (target.childElementCount === 1)
            target.firstChild.click()
        else {
            target = target.parentNode
            setTimeout(() => {
                target.classList.remove('toolbar-cell-clicked')
            }, 150);

        }
    }

    handleMouseDown = e => {
        e.stopPropagation()
        let { target } = e
        if (target.childElementCount === 0)
            target = target.parentNode
        target.classList.add('toolbar-cell-clicked')
    }

    getSelected = (item) => {

        if (item.disable === true)
            return 'toolbar-cell-disable'
        const { selected } = this.props;
        return selected === item.name ? "map-tool-selected" : "";
    }

    render() {
        const { content, secondaryContent, rightContent, className } = this.props;
        return (
            <div className={className}>
                {
                    content && content.map((c, i) => {
                        return (
                            <div className={"toolbar-cell " + this.getSelected(c)} key={i} onMouseDown={this.handleMouseDown} onClick={this.handleClick}>
                                {c.item}
                            </div>
                        )
                    })
                }
                <div className='toolbar-sec-cellbox'>
                    {
                        secondaryContent && secondaryContent.map((c, i) => {
                            const style = { left: i * 40 }
                            return (
                                <div className={"toolbar-cell " + this.getSelected(c)} key={i} onMouseDown={e => e.stopPropagation()} style={style} onClick={this.handleSelect.bind(this, c)}>
                                    {c.item}
                                </div>
                            )
                        })
                    }
                </div>
                {
                    rightContent && rightContent.map((c, i) => {
                        return (
                            <div className={"toolbar-right-cell " + this.getSelected(c)} key={i} onMouseDown={this.stopPropagation} onClick={this.handleSelect.bind(this, c)}>
                                {c.item}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { selected } = state.toolbar
    return { selected }
};

const mapDispatchToProps = (dispatch) => ({
    handleSelect: (name) => dispatch(handler.toolbarSelectHandler(name)),
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler(window))
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

