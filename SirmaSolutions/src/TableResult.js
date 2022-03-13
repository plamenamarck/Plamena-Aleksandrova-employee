import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function TableResult(props) {
  const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="pairContainer">
      <div className="pairWrap">
      <Box container='true' sx={{ width: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={4}>
            {/* HEADERS */}
          <Box gridColumn="span 2">
            <Item>Employee ID #1</Item>
          </Box>
          <Box gridColumn="span 2">
            <Item>Employee ID #2</Item>
          </Box>
          <Box gridColumn="span 2">
            <Item>Project ID</Item>
          </Box>
          <Box gridColumn="span 6">
            <Item>Days worked together</Item>
          </Box>
          {/* DATA RESULT */}
          <Box gridColumn="span 2">
            <Item>{props.person1}</Item>
          </Box>
          <Box gridColumn="span 2">
            <Item>{props.person2}</Item>
          </Box>
          <Box gridColumn="span 2">
            <Item>{props.longestProjectId}</Item>
          </Box>
          <Box gridColumn="span 6">
            <Item>{props.longestWorkDays}</Item>
          </Box>
        </Box>
      </Box>
      </div>
    </div>
  );
}
