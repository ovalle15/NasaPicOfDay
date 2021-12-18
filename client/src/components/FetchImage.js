import apis from '../api'
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import React from 'react';

class FetcImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  async componentDidMount() {
    const tb = apis.getImage()
    const resp = await tb;
    const img = resp.data.items;
    this.setState({
      data: img
    });
  }

  render() {
    return (
      <div>
      <TableBody>
        <TableContainer>
          {this.state.data}
        </TableContainer>
      </TableBody>
      </div>
    )
  }
}
export default FetcImage;