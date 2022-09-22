import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button } from '@material-ui/core';
import { faArchive, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

function SaveArchiveDelete(props) {
    const buttons = [
        {
            id: "save",
            text: "Save",
            icon: faSave,

        },
    ];


    return (
        <Box className="sad-button-container" >
            
            <Box className="sad-button-frame save" display="flex" >
                <Box mx="auto" >
                    <Button
                        className="sad-button"
                        variant="contained"
                        onClick={handleSaveClick}
                        startIcon={<FontAwesomeIcon icon={faSave} />}
                    >Save</Button>
                </Box>
            </Box>
            <Box className="sad-button-frame danger" display="block">
                <Box display="flex" alignItems="baseline" >
                    <Box flexGrow="0" >
                        <Button
                            className="sad-button"
                            variant="contained"
                            color="secondary"
                            disabled={true}
                            onClick={handleSaveClick}
                            startIcon={<FontAwesomeIcon icon={faArchive} />}
                        >Archive</Button>
                    </Box>
                    <Box flexGrow="1">
                        <Typography variant="caption">
                            Makes the facility unavailable yet data is preserved
                                                    </Typography>
                    </Box>
                </Box>
            </Box>
            <Box className="sad-button-frame danger" display="block">
                <Box display="flex" alignItems="baseline"  >
                    <Box flexGrow="0" >
                        <Button
                            className="sad-button"
                            variant="contained"
                            color="secondary"
                            disabled={(facility.facilityId === undefined)}
                            startIcon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={handleDeleteClick}
                        >Delete</Button>
                    </Box>
                    <Box flexGrow="1" >
                        <Typography variant="caption" >
                            The facility will be removed and all associated data will be deleted
                                                    </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

}

export default SaveArchiveDelete;