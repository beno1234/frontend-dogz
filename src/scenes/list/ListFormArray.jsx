import { useField } from "formik";
import React from "react";
import ListForm from "./ListForm";
import { ListFormContext } from "./ListFormContext";
import { FormControl, FormHelperText, FormLabel, Grid } from "@material-ui/core";

function CheckboxGroup({ name, label, error = false, helperText, onBlur, children }) {
    const [field, meta, helpers] = useField(name);
    return (
        <ListFormContext value={{ field, helpers, meta }}>

            {/* <FormControl error={error} style={{ width: '100%' }} onBlur={onBlur}>
                <FormLabel>{label}</FormLabel>
                <Grid container>
                    {children}
                </Grid>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl> */}
        </ListFormContext>
    );
}

export default Object.assign(CheckboxGroup, { Item });
