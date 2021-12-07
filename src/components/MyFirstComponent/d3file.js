import * as d3 from 'd3'

const getRandomNumber = number => Math.floor(Math.random() * number + 1)

class Node {
  constructor (width = 960, height = 500) {
    this.node = document.createElement('div')
    this.node.classList.add('container')
    this.svg = d3
      .select(this.node)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
  }

  drawCircle ({ cx, cy, r, color }) {
    const circle = this.svg.append('circle')
    circle
      .attr('cx', cx)
      .attr('cy', cy)
      .attr('r', r)
      .style('fill', color)
  }

  drawCircles (data) {
    data.forEach(item => this.drawCircle(item))
  }

  addCircle () {
    const circle = this.createNewCircle()
    this.drawCircle(circle)
    return circle
  }

  createNewCircle = () => {
    const cx = '' + getRandomNumber(250)
    const cy = '' + getRandomNumber(200)
    const r = '' + getRandomNumber(35)
    const color = 'brown'
    return {
      cx,
      cy,
      r,
      color
    }
  }

  getNode () {
    return this.node
  }
}

export default Node
