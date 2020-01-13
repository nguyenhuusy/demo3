import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrendingGifs, getMoreTrendingGifs } from '../../redux/actions/giphyActions';
import GiphyItem from '../../components/GiphyItem';
import './giphy.scss';

class Giphy extends Component {
  componentDidMount() {
    this.props.getTrendingGifs();
  }

  render() {
    const { trendingGifs, offset, loading, getMoreTrendingGifs } = this.props;

    return (
      <div className="giphy">
        <div className="search">
          <input name="search" onChange={ e => this.setState({ search: e.target.value }) }/>
          <button onClick={ this.onSearch }>Seach gifs</button>
        </div>
        <h1>Gif images</h1>
        {!!trendingGifs && <div className="giphy-list">
          {trendingGifs.map((item, idx) => 
            <GiphyItem 
              key={ idx }
              id={ item.id }
              img={ item.images.original.url } 
              title={ item.title } 
              />
          )}
        </div>}
        <div className="buttons">
          {!loading && <button className="button" onClick={ () => getMoreTrendingGifs(offset + 20) }>Load more</button>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  trendingGifs: state.giphy.trending.data,
  offset: state.giphy.trending.offset || 0,
  loading: state.giphy.loading
})

export default connect(mapStateToProps, { getTrendingGifs, getMoreTrendingGifs })(Giphy);