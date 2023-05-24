import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListItem from './ListItem';


const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [filteredDatas, setFilteredDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('domains.json')
        .then((res) => {
            setDomains(res.data);
            setFilteredDatas(res.data);
            setError(undefined);

        })
        .catch((err) => {
            setError('We are having some issue while searching for your information');
            setDomains([]);
        });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredResult = domains.filter((domain) =>
      domain.label.toLowerCase().includes(term)
    );
    setFilteredDatas(filteredResult);
  };

  return (
    <div>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <input
        type="text"
        placeholder="Search by domain"
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="table table-stripped table-bordered">
        <thead>
          <tr>
            <th>Label</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
            {filteredDatas.map((domain) => (
            <ListItem key={domain.id} label={domain.label} name={domain.name} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainList;