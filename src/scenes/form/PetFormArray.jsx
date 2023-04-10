import { useField } from "formik";
import React from "react";
import PetsForm from "./PetForm";
import { PetFormContext } from "./PetFormContext";
import { FormControl, FormHelperText, FormLabel, Grid } from "@material-ui/core";

function CheckboxGroup({ name, label, error = false, helperText, onBlur, children }) {
    const [field, meta, helpers] = useField(name);
    return (
        <PetFormContext value={{ field, helpers, meta }}>

            {/* <FormControl error={error} style={{ width: '100%' }} onBlur={onBlur}>
                <FormLabel>{label}</FormLabel>
                <Grid container>
                    {children}
                </Grid>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl> */}
        </PetFormContext>
    );
}

export default Object.assign(CheckboxGroup, { Item });
