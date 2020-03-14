import React from 'react';



class PropertyList extends React.Component {

    state = {
        names: ['name1', 'name2', 'name3'],
        selected: null,
    }

    handleSelect = (e) => {
        e.persist()
        e.stopPropagation();
        this.setState({ selected: e.target.innerText })
    }

    showElement = (name) => {
        const { selected } = this.state;
        if (name === selected)
            return (<input onMouseDown={e => e.stopPropagation()} key={name} />)
        else
            return (<div onDoubleClick={this.handleSelect} key={name}>{name}</div>)
    }

    render() {
        const { names } = this.state;
        return (
            <>
                <div>
                    {
                        names && names.map(name => {
                            return this.showElement(name)
                        })
                    }
                </div>
            </>
        )
    }
}

export default PropertyList;