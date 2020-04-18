import React from "react";
import './draw.css'
import TopNavbar from '../tools/TopNavbar'
import Toolbar from '../tools/Toolbar.js'
import PropertyBar from './PropertyBar'
import DisplayPlace from "./DisplayPlace";
import * as handler from '../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';


class Draw extends React.Component {

    render() {

        return (
            <div onClick={this.props.handleUnselect}>
                <TopNavbar side={false} view={false} />
                <div className="painter-wrapper">
                    <Toolbar
                        className="map-toolbar"
                        content={[
                            { name: TOOLS.UNDO, item: <i className={"fas fa-undo"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.REDO, item: <i className={"fas fa-redo"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.UPLOAD, item: <i className={"fas fa-upload"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.DOWNLOAD, item: <i className={"fas fa-download"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.SAVE, item: <i className={"fas fa-save"} style={{ fontSize: '24px' }} /> },
                        ]}
                        secondaryContent={[
                            { name: TOOLS.STAMP, item: <i className={"fas fa-pencil-alt"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.LINE, item: <img src={line} className="tool-bar-icon-img" alt='line' /> },
                            { name: TOOLS.SQUARE, item: <i className={"far fa-square"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.CIRCLE, item: <i className={"far fa-circle"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.ERASER, item: <i className={"fas fa-eraser"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.FILL, item: <i className={"fas fa-fill"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.SELECT, item: <img src={crop} className="tool-bar-icon-img" alt='crop' /> },
                        ]}
                        rightContent={[
                            { name: TOOLS.ZOOM_OUT, item: <i className={"fas fa-search-minus"} style={{ fontSize: '24px' }} onClick={this.handleZoomOut} /> },
                            { name: TOOLS.ZOOM_IN, item: <i className={"fas fa-search-plus"} style={{ fontSize: '24px' }} onClick={this.handleZoomIn} /> },
                        ]}
                    />
                    <PropertyBar />
                    <DisplayPlace />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Draw);;



const TOOLS = {
    ZOOM_IN: "ZOOM_IN",
    ZOOM_OUT: "ZOOM_OUT",
    UNDO: "UNDO",
    REDO: "REDO",
    UPLOAD: "UPLOAD",
    DOWNLOAD: "DOWNLOAD",
    SAVE: "SAVE",
    STAMP: "STAMP",
    ERASER: "ERASER",
    FILL: "FILL",
    SELECT: "SELECT",
    LINE: 'LINE',
    SQUARE: 'SQUARE',
    CIRCLE: 'CIRCLE',
}
const line = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAMFBMVEX///8AAAAMDAzFxcXKysr6+vq/v7+qqqrX19cgICBQUFDx8fHa2tomJibOzs6wsLAZKweEAAABIUlEQVR4nO3d2W0CUQAEwV3u0+SfrYVkYf4X6TWrqgimI5hpAgAAAAAA2B+Op9EbPmF3nuf5ch09Y7HtZn66jN6x1F/HPN9GL1nm1TE/Rk9Z5L9j3o7essRbx30/eswCbx2bn9FjFnjv2I0es4COFh0tOlp0tOho0dGio0VHi44WHS06WnS06GjR0aKjRUeLjhYdLTpadLToaNHRoqNFR4uOFh0tOlp0tOho0dGio0VHi44WHS06WnS06GjR0aKjRUeLjhYdLTpadLToaNHRoqNFR4uOFh0tOlp0tOho0dGio0VHi44WHS06WnS06GhZS8duJR378zo6psNKOqbjSjqm00o6pumyko7p+iy5f/OvzMvtsf3mnx8AAAAAAOBTfgECJQtjFJydSAAAAABJRU5ErkJggg=='
const crop = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTExIVFRIXEg8VFhMVEA8VEhUSFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAADAQEBAQEBAAAAAAAAAAAAAgMBCAcGBAX/xABUEAABAgMEAwkIDQkHBQEAAAABAAIDESEEMUFRBQcSBhMiMmFxgbHRFTVyhJGhtMEIFBclVGR0srPC0tPwQnOCkpOUpOHiM0RSU1VjoiMkNIPxFv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD3FCEjzK5AxKFjEyDAUEpIhldfkthVrigZAK1TimVcetA5KEkIzrjlkqIMBQSli54pYZma35IKBAK1LEuQMSsCmx0zXyKqDJrUrxRTY6d/RyoKgomtWEINWAqIdOmGeaugwlagqG3hOk7/AFILAoJQAtQCFPa8nUqBAIQhBhKGhBK1BJ4IqOkLXRRKlSbgtiPlz4BTEMtrfmOxBSGyVTese3EX4jNO106hY98uxAu/CU/NjNDGYm/qSb2eNjkqsfNAsRmIv60CMJT82M18juz1lWLRsRsGNvsSKWhxZBYxxY03Fxc5oE5XTmv7WgdLQrbAZaYDw5j7qSIIoWuGDgUH9NjSanoGSaIydReiG+fPiEznSqUCNi0rQi9Y1u1U3YD1pCwurdl/NVhxJ0uOSAiMnz4FYyJgaEJyVEt263DBAwG1U8XAZp3smlhvwN6ogmx8qG/PNLxvB61jht82eaaG6XBN+HKgdzQRJI10jI9BVVF3CoLsT2INJ2qC7E+oJ9kSlgkYdmh6CqoJA7NDdgfUUOdMyHSckPM+COk5LG8GmGB7UFWtkJLAJJlk0GoQhAKTzs3eRUJWNb5UCwm43k4qikRs1F2IyTOiACfk5UCROCZjHBbCE+EanqWw2Ym/qWObKo6QgqoxRLhDyZpzEEppWMnU9AyQcsa54k9M2vxb0aEvYfY/d6vGI/1V5DrqPv1ax8l9Ggr13UAZaKr8Ij/VQejxmy4QoetLD4RmcMEzW7VTdgPWVsRmIv60FFOKzG4jFayICMs0gG1U8XAZoFYdo1wwzX6FOJDnUUIRDiTvoReg2IyfIc1Jrtqhu603G8HrTvhz5JXIHASvZNLDfgb+tY47VBdifUECB5PBn05q7RJK6GJSWMfgb880DubOhUNs8Wf6X4xTvdOg6Tkm3sSkg1jZUC0iam10qHoK176yF/UgWcqT6clVoWNYAJIFEDIQhBhK1Cm52zzIGiPl2KIYW8KXRkqQ2Ym/qVEGArHvkFN3Arhl2LYbZ8I9AyQTDDxpdC/Q106haovGzUXYhBy3rrHv1a/FfRoK9a1Bwj3LnfK0RqZ8VeSa54k9M2s5+1vRoK9g9j73q8Yj/VQeksfNaSpxGy4Q6eVY3h1wy7UCuYXVH/1Vhvn2J1OIzEX9aCi/O9u3dcMc1rXbfIMeVXAQThPnS4jBUU4kOdRQ5pA8updn/JAPG0aYYp4TsLiE7RJLEZPnwKB1GJwqDpOSwRCeDccT2KrGyoECQjLgm/rVUr2TUd8PFxzQPFM+CL+pZD4ND0HNUYyS1zZ3oNWTUw4inkKo0INQhCDCUobiUxWoI8XwepfHa1d3DtF2eG6Exr40V7ms25720NE3OdKpvbSYvX2sRwAqvmt2G5KBpGAIVoDgA7aY9p4cN0iJjMEGoQeIO136SnPZsx/9MSXz1sPXfpPBtm5t5iS+evtPcBsvwyP+rC7FjtQdkFfbkf8AVhdiD40a8dKf4bN+xifbXreq3dk7SsB74rGsiwnhjwye9umJhzQSSMaVuXynuD2aU/bceXgQZy8i9F3GblLPo2BvNnBIJ2nxHSL3ulKZPUMEHOuukDu1ax8l9Ggr172P9NFeMR/qryDXZ36tfivo0Fes6hGHuXO8e2I0x+qg+L1j617ey2xYFliCBCgvdD/soT3Pc2hc4xGmk7gMF8y3W1pif/m/w1i+7Xu+6TVno63xjaIsN4iuA2nQ4mxtSEgXCVTKQnyL+T7iOi8o/wC3/pQeQHW3pn4b/DWL7tZE1s6YlI23+Gsf3a9b9xXRhuEeQ/37+aidmpPRRrKP+3/pQePt1s6XnP25/DWL7tO7W3pkf33+GsX3a9f9xDReUf8Ab/0qZ1K6MPFEeQ/38eSiDyR2trTEq23+GsX3aQa2dL0/7y74tY/u17AzUpos4R54/wDX/pTe4hovKP8At/6UHkDtbemfhtPk1i+7X0e4HWxpB9tgwbVFEaFHiwoP9lBY9jojg1rmmG1uJE5zov7W7zVXo+yWG0R4Ijb5CYHDaizbPaAqJVvXk+4ge+dhPx6xfTMQdgGEJUpK4ohvwN/WqKMapkL88kDRH4C/qRvIlLz4zWQKUx6+VVQTY/A355oiPwF6yOZ0x6uVZBoZG/PNA7YdOXNaEywoNQhCAUy7ZvuTkpdid/kQKxkzM9AyVSFEHZobsDkqudITQSns+D1Ia3aqbsB60NbtVN2A9ZRxfB6kFlEjZqOLiMlUnFSA2qni4DNBy3roie/NrI+LejQV6/7H3vV4xH+qvINdLR3ZtY+S+jQV6/7H7vV4xH+qg9Gc3ZqLsR61k9rwetHG8HrWubs1F2I7EFQFN7ZVF+IzTtdMTCm47VBdifUEGbW1QUGJ9Sq0SU3Q5Vb5M07HzQLEZiL+tLvhdQUz5Fr3TMh0nJBhSq28edB8prYbLQ9sA/yh89q5o3DE90bEB8OsX0zF0trXfPRFsz3oTH6bVzVuGb742H5dYpftmIOv99JoBXHkVYbJJDByvzTQ4k6GhyQERk+fApN9N0uF5udNEfgL1m805c+VA0NkufErXsmlhvwN/WtiPlz5IFDyKG/rVGhI2HnfmmaUDIQhBhWrCEm3K/yoGiSlW5fnbhtT2cP5qrW7RmbsB61QiaDVjuW5SB2aHi4HJAG1U8XAZoJjlnsT/HQv1BZJS4vg9SDlvXZ36tfivo0Fes6hAe5dZ7PtiNP/AIrybXQ8d2bWR8V9Ggr1/wBj93q8Yj/VQelNlKly1RI2aji4jJBdtUF2J9QQI+87N2P8leHKVLlrRJTc2VR0hBVfniX8G/H8Zpy/ao3pOSdjZUCDIMpU/BTqb2Yi/EZpTFnRt/Ug+R1uS7lWuV+9CfNtNvXN+4nvnYfl1i+mYuk9a7JaItn5ofPauatwzj3RsPy6xS59+Yg7GUY14lxvxegxp0A4WWSeGyXPiUCQMf8AFirKcSHOovS79hLhZINj/wDLBZBvM+N6uRPDZKpvREZPnwKB1hSCJnf1p2hBqEIQBKmWzvuyTlagk10jI9BVCVkQCVbl+dpnIOuw5edBSW1fxcBmgHZobsDlyKyxwzQbNR43g9amDhM7M71+kIOVtdDPfm1gfFvRoK9f9j93q8Yj/VXkGuzv1a/FfRoK9Z1COPcvk9sRpn9VB6Y47VBdifUFhGzdxcRlyqrQJUuWoMBU3unQdJyU3GRIF2PJzK8MCVLkEyzZqLsR61Vrp1C1fniGR4PSgo9+AvzyS71Kovx5U8ECVE6D4/Wu+eiLZ+aHz2rmjcMD3RsPy6xeXfmLpPW5LuVa5X70J/rNXN+4jvnYfl1i+mYg6+3qVQeF1p4b58+SdRjUII43XzoHiPlz4BJvOM+Fn6lsDPHFVQJDiTob8lr3y7EkcY44LINSZ8bq5kDBmJv6k7StWFBqEIQYQl25Xp1NzdrmQYBtX8XLNO5oIklY6VD0HNUQSa6VD0FZxvB60Hh+D1rWO2aHoKChaJSwUgdmhuwOSsouO1QXYnsQcua6XDu1az8l9Ggr172P9dFeMR/qryDXRD9+bWB8W9Ggr1/2PverxiP9VB6LxfB6lrnToOk5Ie6dB0lYOB4PUgo1oAkpkbNRdiMlZSiPwF/UgHRJ0bfnknYySkG7HKMe1WBmgm5sjMdIQ6LlUnzLYj8BekEMtqK5/wAkHyutZktEWzPehM/ptXNW4Z3vjYfl1il+2YultbDp6IthH+UPntXNG4YHujYT8esX0zEHYRjUpfkmhslU3qe9kVvOPKqsfNAsRmIv61m/CXLljNPEfLsUt6PG/K83MgeGzE39S2IydReiG+fPiFr3SQK2JnfkmCQMJqb8FRpQahCEGELVhCwOzQERoIqoNdtUJp1pzwvB61RzARJAwCV7ZiRSsfKhvwOaxx2qC7E+oIJhx4s6TlP1L9DRJYWCUsEjHSMj0FBy1rsPv1a/FfRoK+81O7tbFZNH7zaLSyFEMeK6RDp7LpSNAv4+ufcTbH6RiWqBAiR4UUQf7GG6I5j2Q2wy1zWzP5E5yxXn53H6Sv7n2z9ztP2UHSrNZmiQJC2w/JE7Fp1naJ+Gw/JE7FzU/cfpC/ufbB4nafsrGbj9If6fbOb2nafsoOkTrM0WKC2w5c0SnmVGay9Ej++w/JE7FzWdx+kv9Ptn7nafsoduP0jKZ0fbB4nafsoOlvdO0T8Nh+SJ2KJ1maKHFtsORwlEp5lza3cfpCfe+2fudp+ymduP0j/p9s/c7T9lB0nD1l6JH9+hzxMonYv3aK3eaOtMQQoNrhuiO4rJuBcchMCZ5Fy8dx+kZV0fbOf2nafsr+luX3B6Si2qEBZY8GUSG4xYkGJCawNcDtBzgJkSuCD3/W2JaKtcsYQmP021XN+4g++VhHx6xfTMXSWtaHLRFsnU70Jn9Nq5r3Dv98bDyW6xfTMQdgWy1MhMdEiPayG0FznuIDWgYklfJRNZeigZi2w54iUSR8yzWzoWNbtGxINnrE24bwyct8DDMs58a4gLm9+47SN3c62fudoPnDUHSMPWZoq822HPmiU8yp7p2ifhsPyROxc0jcfpG46Ptn7nafspP/x+kPgFr/c7T9lB1jonTlmtbDFssdkVoOyS03HJwvC/owuEZm8YZLyHUJuStdldHtFohvgsfDYxkOI0te5wdPbLDVsrhP8AxFewRGYi/rQUWEJWxJhaEDIQhAKT27XMqELUE4bsDQqiSIyfPgVIPLuD5TnzIGfwqC4Y9i2G6XBPRyqjRJY9k0DKMQ7XBHScku2eLOuf4xVmNkJBBOGdmh6CrLHNnQqBeRwZ9KB4rp8EdPIlZwKG449qqxklpE0GqcV+AqSpl5bS/Lk51WGyXPiUE2t2OY45K6CF+dztil4w5P5IKxHy5TkpBhbW/Pk5lSGzG8nFUQfIa2TPRFs/ND57VzPuG75WE/HrF9MxdKa2hs6JtcrjCFP023Lm7cOffKwj49YvpmIOvBDI4WOI7Fdrp1C1RicGo6R2IKPdIKOweNjl+MU8MT4R6BkqoFY+a1zpKcUS4Q6eVYzhVN2A7UBsk18yq0rVkkGoQhBhCxrvKmUnid3lQDjtUF2J9QTOhCWUrlkJ2FxGCognDfgb+tY906DpOSyLwjIYY5LYJlwbj18qBt6EpLGPlQ34HNUUYpnwRfnkgZ78Bf1IEISklhUob881ZBJrpGR6CtiPwF6yMcLyfNypYfBMjjigdsISrWd6wHZobsD6iqqcV2F5OCDYj5c+AWMh51JvSMGya445ciugjxfB6k73y9XKiI4AerNSa3ZqbupB8rrXZ70Wwm/eh0cNq5s3Dv8AfGwzwt1i+mYultbXei2fmh89q5n3DH3ysPy6xfTMQdiueAJpWNnU9AyUg0jhEUyyX6AZoJubKo6Qn3wSngtc6VSvz7B40qTnL1oKNbtVN2A9ZWvZWYvxGadrp1CCUGNeCJoBmpynUCnWqgoNQhCDCtAWFDXIFiMnUUOanvhdQUOJ7Ez3E0HSckGFlQjHtQOxsqBZEZPnwKIb58+SyI/AX55IE3w8X8rPDnVWMkk3kS5c8ZrYb8Df1oGeyalvhHBxwKeI/AXrBBEq358qBobJc+JTObMSKRj8Dfgc1sR8ufAIJ74W0Ncv5qkNkqm9KIWdSfxRDHEUPQUFCJqJfs0NRh2Kr3y7EjYc6uqT5kGw2Ym/qVCFIHZobsD6ine+QQfyt0WiWWmzRbNEJEOKxzCRxmm8EZyIBXmW4rUs6y2uHaI9oZEZCe2JDYxjw5z2mbC8niyMjITuvXr7WTq7oGSzi+D1ILKLuDX8nLLmVS4ATU2t2qm7AesoMYNqpuwHrVlEjZqLsRkq7QlPBBN42ai7ELG8Kv5OWaANrwcs1rmyqOkIKrJIa6dVgM0DIQhAKbxkqIQJDlJOsIQUE4gmaX5rYQlTHFOBJBCDVOKJ8/UnQAgnCEufrVVhCJoEjCdMcFkMSNb81QBBCDUkWUqpggBBKG2RrfgVZYQgIMfKVVJjZET6ORVkmIQCx3KgBZJBENzuwGS/QhKBJAxX59j9WdysRNMgwLUoEkETQJs5XKoQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhAIQhB//2Q=='