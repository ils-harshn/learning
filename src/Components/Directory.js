import PropTypes from 'prop-types'
import { useState } from 'react';

const Directory = ({ files, depth }) => {
    const [isExpanded, toggleExpanded] = useState(false);

    if (files.type === "file") {
        return (
            <li className='file-name'>{files.name}</li>
        )
    }
    return (
        <div className='folder'>
            <input type='checkbox' checked={isExpanded} onChange={(e) => toggleExpanded(e.target.checked)}></input>
            <h2 className='folder-title' onClick={() => toggleExpanded(!isExpanded)}>{files.name}</h2>
            <ul>
                {
                    isExpanded && files.items.map((item, index) => <Directory files={item} key={index} depth={depth + 1}/>)
                }
            </ul>
        </div>
    )
}

Directory.propTypes = {
    files: PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['folder', 'file']).isRequired,
        items: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                type: PropTypes.oneOf(['folder']).isRequired,
                items: PropTypes.array.isRequired,
            }),
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                type: PropTypes.oneOf(['file']).isRequired,
            }),
        ])),
    }).isRequired,
    depth: PropTypes.number.isRequired
}

Directory.defaultProps = {
    depth: 1,
}

export default Directory  