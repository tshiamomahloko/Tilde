import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// hactoberfest: Visual debt. Make this look better: max height of container should fit viewport
import { Link } from "react-router-dom";

import {
  TableRow,
  TableHead,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
} from "@material-ui/core";

import { routes } from "../../../routes";
// import FilterListIcon from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
  highlightedGroup: {
    backgroundColor: theme.palette.primary.light,
  },
  container: {
    maxHeight: 800,
  },
}));

export default function Presentation({
  userGroups,
  users,
  filterByGroup,
  filterByUser,

  filterUsersByGroupName,
  handleUserGroupClick,
}) {
  const classes = useStyles();
  //   const usersLabel = filterUsersByGroupName ? "": "Users"
  return (
    <Grid container>
      <Grid item xs={4} className={classes.grid}>
        <TableContainer className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField
                    label="User Groups"
                    variant="outlined"
                    {...filterByGroup}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userGroups.map((group) => {
                return (
                  <TableRow
                    key={group.id}
                    className={
                      group.name === filterUsersByGroupName
                        ? classes.highlightedGroup
                        : ""
                    }
                  >
                    <TableCell onClick={() => handleUserGroupClick(group.name)}>
                      {group.name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={4} className={classes.grid}>
        <TableContainer className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TextField
                    label={`${filterUsersByGroupName} Users`}
                    variant="outlined"
                    {...filterByUser}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(users).map((email) => {
                return (
                  <TableRow key={email}>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      <Link
                        to={routes.userBoard.route.path.replace(
                          ":id",
                          users[email].userId
                        )}
                      >
                        <Button size="small" variant="outlined">
                          Board
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
