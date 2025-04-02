import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


const API_BASE_URL = "https://4611hope.vercel.app/api";


export const handleProject = async (projectId, action) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/${action}/${projectId}`,
            {
                headers: {
                    "Content-Type": "application/json"
            }}
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return { message: "Failed to join/leave!" };
    }
};

export const handleHardware = async (projectId, qty, action) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/${action}/${projectId}/${qty}`,
            {
                headers: {
                    "Content-Type": "application/json"
            }}
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return { message: "Failed to check in/check out!" };
    }
};

function HWSet({setOne, setTwo, capacity}) {
    return (
        <div style={{marginLeft: '1%', marginRight: '1%'}}>
            <p>HWSet1: {setOne}/{capacity}</p>
            <p>HWSet2: {setTwo}/{capacity}</p>
        </div>
    )
}

function ButtonCollection({projId}) {
    const [qtyOne, setQtyOne] = useState(0);
    const [qtyTwo, setQtyTwo] = useState(0);

    return (
        <>
            <TextFieldCollection
                setOne={setQtyOne}
                setTwo={setQtyTwo}
            ></TextFieldCollection>
            <div style={{marginLeft: '1%', marginRight: '1%', display: 'flex', flexDirection: 'column'}}>
                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button
                        onClick={() => {
                            handleHardware(projId, qtyOne, "checkin").then((data) => {
                                console.log(data);
                                alert(data.message);
                            });
                        }}
                    >Check In</Button>
                    <Button
                        onClick={() => {
                            handleHardware(projId, qtyOne, "checkin").then((data) => {
                                console.log(data);
                                alert(data.message);
                            });
                        }}
                    >Check Out</Button>
                </ButtonGroup>
                <ButtonGroup variant="text" aria-label="Basic button group">
                    <Button
                        onClick={() => {
                            handleHardware(projId, qtyTwo, "checkin").then((data) => {
                                console.log(data);
                                alert(data.message);
                            });
                        }}
                    >Check In</Button>
                    <Button
                        onClick={() => {
                            handleHardware(projId, qtyTwo, "checkin").then((data) => {
                                console.log(data);
                                alert(data.message);
                            });
                        }}
                    >Check Out</Button>
                </ButtonGroup>
            </div>
        </>
    )
}

function TextFieldCollection({setOne, setTwo}) {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <TextField onChange={(e) => {setOne(e.target.value)}} id="outlined-basic" label="Enter qty" variant="outlined" size="small"/>
            <TextField onChange={(e) => {setOne(e.target.value)}} id="outlined-basic" label="Enter qty" variant="outlined" size="small"/>
        </div>
    )
}

function HoverableDiv({children}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                backgroundColor: isHovered ? 'lightgreen' : 'white',
                transition: 'background-color 0.3s ease',
                display: 'flex', alignItems: 'center', border: '1px', borderStyle: 'solid', borderColor: 'black', margin: '1%'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children} {/* Display children inside this div */}
        </div>
    );
}

function ProjectRow(
    {title, setOne, setTwo, capacity, users, joined}
) {
    return (
        <HoverableDiv>
            <h2 style={{margin: '1%'}}>{title}</h2>
            <p> Authorized Users: 
                {users.length === 0 ? (
                    <span> None</span>
                ) : (
                    users.map((user, index) => (
                        <span key={index}>{" " + user + ","}</span>
                    ))
                )}
            </p>
            <HWSet setOne={setOne} setTwo={setTwo} capacity={capacity}></HWSet>
            <ButtonCollection projId={title}></ButtonCollection>
            <Button
                onClick={() => {
                    handleProject(title, joined ? "leave" : "join").then((data) => {
                        console.log(data);
                        alert(data.message);
                    });
                    joined = !joined;
                }}
            >{(joined ? ("Leave") : ("Join"))}</Button>
        </HoverableDiv>
    )
}

export default function Projects() {
    const projects = [
        {title: "Project Name 1", hwSetOne: 50, hwSetTwo: 0, hwCapacity: 100, authorizedUsers: ["Johnny", "John", "James"], isJoined: false},
        {title: "Project Name 2", hwSetOne: 50, hwSetTwo: 0, hwCapacity: 100, authorizedUsers: [], isJoined: true},
        {title: "Project Name 3", hwSetOne: 0, hwSetTwo: 0, hwCapacity: 100, authorizedUsers: [], isJoined: false}
    ];
    return (
        <div style={{border: '2px', borderStyle: 'solid', borderColor: 'black', margin: '2%'}}>
            <h1 style={{margin: '1%'}}>Projects</h1>
            {projects.map((project, index) => (
                <ProjectRow title={project.title} setOne={projects[index].hwSetOne} setTwo={projects[index].hwSetTwo} capacity={projects[index].hwCapacity} users={projects[index].authorizedUsers} joined={project.isJoined}></ProjectRow>
            ))}
        </div>
    );
}