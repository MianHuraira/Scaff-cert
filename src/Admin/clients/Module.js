import { Accordion, Button, Card, Form } from 'react-bootstrap';
import React, { useState } from 'react';

function Module({ module, subModules, handleCreateSubModule }) {
    const [showSubModuleForm, setShowSubModuleForm] = useState(false);
    const [subModuleName, setSubModuleName] = useState('');

    const handleSubModuleNameChange = (e) => {
        setSubModuleName(e.target.value);
    };

    const handleSubModuleFormSubmit = (e) => {
        e.preventDefault();
        handleCreateSubModule(subModuleName, module.id);
        setSubModuleName('');
        setShowSubModuleForm(false);
    };

    return (
        <Accordion>
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        {module.name}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <>
                        <Card.Body>
                            {subModules.length > 0 && (
                                <Accordion>
                                    {subModules.map((subModule) => (
                                        <Card key={subModule.id}>
                                            <Card.Header>
                                                <Accordion.Toggle as={Button} variant="link" eventKey={subModule.id}>
                                                    {subModule.name}
                                                </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey={subModule.id}>
                                                <Card.Body>
                                                    <Module
                                                        module={subModule}
                                                        subModules={subModule.subModules}
                                                        handleCreateSubModule={handleCreateSubModule}
                                                    />
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))}
                                </Accordion>
                            )}
                            {showSubModuleForm && (
                                <Form onSubmit={handleSubModuleFormSubmit}>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter sub-module name"
                                            value={subModuleName}
                                            onChange={handleSubModuleNameChange}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Create Sub-Module
                                    </Button>
                                </Form>
                            )}
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="link" onClick={() => setShowSubModuleForm(!showSubModuleForm)}>
                                Create Sub-Module
                            </Button>
                        </Card.Footer>
                    </>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );
}

export default Module;