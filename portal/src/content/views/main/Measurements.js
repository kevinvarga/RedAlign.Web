import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { connect, useSelector } from 'react-redux';
import { measurementsUpdate } from '../../../actions/SessionActions';
import PortalApi from '../../../common/PortalApi';
import Spinner from '../../components/common/Spinner';
import NoData from '../../components/common/NoData';

function Measurements(props) {
    const { measurementsUpdate } = props;
    const [loading, setLoading] = useState(true);
    const sessionState = useSelector(state => state.session);
    const { getAccessTokenSilently } = useAuth0();
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (loading) {
                try {
                    const token = await getAccessTokenSilently();
                    new PortalApi().request("/alignmentcontoller",
                        token)
                        .then(data => {
                            console.log(data);
                            setResults(data);
                            //measurementsUpdate(JSON.stringify(data));
                            setLoading(false);
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } catch (err) {
                    console.log(err);
                }
            }
        }
        fetchData();
    }, [loading]);

    const formatDate = (date) => {
        let formatted = new Date(date);
        return `${formatted.toLocaleDateString()} ${formatted.toLocaleTimeString()}`;
    }

    const renderTable = () => {
        if (results.length === 0) {
            return (<NoData message="No measurement results found" />);
        } else {
            console.log(`render table; row count: ${results.length}`);
            return (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableCell>Date</TableCell>
                            <TableCell>Alignment Hardware (Name/Model)</TableCell>
                        </TableHead>
                        <TableBody>
                            {results.map((result, index) => (
                                <TableRow
                                    key={index}
                                    hover
                                >
                                    <TableCell>{formatDate(result.startTime)}</TableCell>
                                    <TableCell>{result.name} / {result.model}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    }

    return (
        <Box m={1} >
            <Box mb={1}>
                <Box mr={1} display="inline" >
                    <FormControl >
                        <InputLabel shrink id="select-facility-label" >Facility</InputLabel>
                        <Select
                            labelId="select-facility-label"
                            value={0}
                            autoWidth={true}
                            defaultValue={0}
                            margin={1}
                        >
                            <MenuItem value={0}>Beni's Lab</MenuItem>
                        </Select>
                    </FormControl>
                </Box>                    
                <FormControl>
                    <InputLabel shrink id="select-equipment-label" >Equipment</InputLabel>
                    <Select
                        labelId="select-equipment-label"
                        value={0}
                        autoWidth={true}
                        defaultValue={0}
                    >
                        <MenuItem value={0}>Water Pump #1</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {loading ?
                <Spinner message="Loading measurements..." />
                :
                renderTable()
            }
        </Box>
    );
}

//let data = null;
/*try {
    if(sessionState.measurements.data !== null) {
        data = JSON.parse(sessionState.measurements.data);
    }
} catch (err) {
    console.log(err);
}*/

export default connect(null, { measurementsUpdate })(Measurements);