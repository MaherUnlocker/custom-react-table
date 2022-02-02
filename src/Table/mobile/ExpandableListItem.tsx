import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';

const styles = {
  summaryText: {
    width: '100%',
  },
  detailsText: {
    opacity: 0.5,
    width: '100%',
  },
  checkbox: {
    padding: `0 10px 5px 0`
  }
};

/**
 * Expandable component with header text (summary) and expandable description text (details)
 */
class ExpandableListItem extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected && nextProps.scrollToSelected) {
      // @mui/material encourages ReactDOM until React find better way
      // https://@mui/material.com/getting-started/frequently-asked-questions/#how-can-i-access-the-dom-element-
      ReactDOM.findDOMNode(this).scrollIntoView(nextProps.scrollOptions || { behavior: 'smooth', block: 'center' })
    }
  }

  onSelect = (event) => {
    const { onSelect, row } = this.props;

    onSelect(row);
    event.stopPropagation();
  }

  render() {
    const {
      classes,
      checkboxSelection,
      panelClass,
      details,
      selected,
      summary,
      AccordionDetailsProps,
      AccordionDetailsTypographyProps,
      AccordionMoreIconProps,
      AccordionProps,
      AccordionSummaryProps,
      AccordionSummaryTypographyProps,
      SelectedExpansionPanelProps,
    } = this.props;

    const rootProps = selected
      ? { ...AccordionProps, ...SelectedExpansionPanelProps }
      : AccordionProps;

    return (
      <Accordion className={panelClass && panelClass} {...rootProps} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon {...AccordionMoreIconProps} />}
          {...AccordionSummaryProps}
        >
          {checkboxSelection && <Checkbox className={classes.checkbox} checked={selected} onClick={this.onSelect} />}
          <Typography
            classes={{
              root: classes.summaryText,
            }}
            gutterBottom
            variant="subtitle1"
            {...AccordionSummaryTypographyProps}
          >
            {summary}
          </Typography>
        </AccordionSummary>
        <AccordionDetails {...AccordionDetailsProps}>
          <Typography
            classes={{
              root: classes.detailsText,
            }}
            gutterBottom
            component="div"
            {...AccordionDetailsTypographyProps}
          >
            {details}
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  }
}

export default withStyles(styles)(ExpandableListItem)
