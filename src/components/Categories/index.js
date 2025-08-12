import './index.css'

const Categories = props => {
  const {categoryDetails} = props
  const {name} = categoryDetails

  return (
    <li className="category-item">
      <a className="category-button" href={`#${name}`}>
        {name}
      </a>
    </li>
  )
}

export default Categories
