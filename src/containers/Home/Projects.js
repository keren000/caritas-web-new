import React from 'react'
import Navbar from '../../pages/Navbar'
import Menu from '../../pages/projects/Menu'


function Projects(props) {
    return(
        <React.Fragment>
            <Navbar />
            <Menu causeIndex={props.location.state?.causeIndex == null? 1 : props.location.state?.causeIndex}/>
        </React.Fragment>
    )
}

export default Projects;