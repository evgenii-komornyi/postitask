import { withStyles } from '@material-ui/styles';
import { ListItem } from '@material-ui/core';

export const CustomListItem = withStyles({
    secondaryAction: {
        paddingRight: 96,
    },
})(ListItem);
