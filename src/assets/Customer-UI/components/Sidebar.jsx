import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography, Box } from "@mui/material";
import "./Sidebar.css";

export default function Sidebar() {
  const sideBarTab = [
    {
      link: "",
      title: "Woman's fashion",
      hasDropdown: true,
    },
    {
      link: "",
      title: "Men's fashion",
      hasDropdown: true,
    },
    {
      link: "",
      title: "Electronics",
    },
    {
      link: "",
      title: "Home & Lifestyle",
    },
    {
      link: "",
      title: "Medicine",
    },
    {
      link: "",
      title: "Sports & Outdoor",
    },
    {
      link: "",
      title: "Baby's & Toys",
    },
    {
      link: "",
      title: "Groceries & Pets",
    },
    {
      link: "",
      title: "Health & Beauty",
    },
  ];

  const steps = [
    { label: "Slide 1", imgPath: "/icons/home-page/banter-img.png" },
    { label: "Slide 2", imgPath: "/icons/radio-bg.png" },
    { label: "Slide 3", imgPath: "/icons/home-page/banter-img.png" },
    { label: "Slide 4", imgPath: "/icons/home-page/banter-img.png" },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="flex mt-3">
      <div className="flex grid grid-rows-3 w-80 grid-flow-col gap-4 text-left sidebar-exclusive ml-32">
        <div className="row-span-3 flex mt-16">
          <ul>
            {sideBarTab.map((tab, index) => (
              <li key={index}>
                <div className="flex">
                  <a style={{ cursor: "pointer" }}>{tab.title}</a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="row-span-2 col-span-2"></div>
      </div>
      <div className="row-span-3 w-full">
        <Box sx={{ maxWidth: 1000, flexGrow: 1 }}>
          <img
            src={steps[activeStep].imgPath}
            alt={steps[activeStep].label}
            style={{ width: "100%", height: "auto" }}
          />
          
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              disabled={activeStep === maxSteps - 1}
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
}
