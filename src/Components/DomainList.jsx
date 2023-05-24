import React, { useState, useEffect } from 'react';
import axios from 'axios';


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

  if (error) {
    <div>
      <h1>ERROR</h1>
      <p>{error}</p>
    </div>
  }

  return (
    <div>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <input
        type="text"
        placeholder="Search by domain"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredDatas.map((domain) => (
          <li key={domain.id}>{domain.id} | {domain.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default DomainList;