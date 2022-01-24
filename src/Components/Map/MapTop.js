import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import TopDiv from "./TopDiv";
import { useSelector } from "react-redux";

export default function MapTop({ plotSetter, plotBy }) {
  const tableHeader = ["confirmed", "active", "recovered", "deceased"];
  const [reqData, setReqData] = useState({
    confirmed: {
      total: "---",
      delta: "---",
    },
    active: {
      total: "---",
      delta: "---",
    },
    recovered: {
      total: "---",
      delta: "---",
    },
    deceased: {
      total: "---",
      delta: "---",
    },
  });
  const data = useSelector((state) => state.data.value);
  const isLoading = useSelector((state) => state.data.status);
  useEffect(() => {
    if (isLoading === "success") {
      setReqData({
        confirmed: {
          total: data["TT"]["total"]["confirmed"],
          delta: data["TT"]["delta"]["confirmed"],
        },
        active: {
          total:
            data["TT"]["total"]["confirmed"] -
            data["TT"]["total"]["recovered"] -
            data["TT"]["total"]["deceased"],
          delta: 0,
        },
        recovered: {
          total: data["TT"]["total"]["recovered"],
          delta: data["TT"]["delta"]["recovered"],
        },
        deceased: {
          total: data["TT"]["total"]["deceased"],
          delta: data["TT"]["delta"]["deceased"],
        },
      });
    }
  }, [isLoading]);

  return (
    <Box sx={{ width: "100%", margin: "10px" }}>
      <Grid container spacing={0}>
        {isLoading === "success" &&
          tableHeader.map((key) => {
            return (
              <Grid item xs={3}>
                <TopDiv
                  heading={key}
                  subHeading={reqData[key]["delta"]}
                  number={reqData[key]["total"]}
                  plotSetter={plotSetter}
                  plotBy={plotBy}
                />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
