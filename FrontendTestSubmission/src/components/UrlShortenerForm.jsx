import React, { useState } from 'react';

const UrlShortenerForm = () => {
    const backend_api = import.meta.env.VITE_API_URL;

    const [forms, setForms] = useState([
        { url: '', validity: '', shortcode: '', result: null, error: null }
    ]);

    const handleChange = (index, field, value) => {
        const newForms = [...forms];
        newForms[index][field] = value;
        setForms(newForms);
    };

    const handleSubmit = async (index) => {
        const { url, validity, shortcode } = forms[index];

        if (!url || !url.startsWith('http')) {
            alert('Please enter a valid URL starting with http or https');
            return;
        }

        const data = {
            url,
            validity: validity ? parseInt(validity) : undefined,
            shortcode: shortcode || undefined
        };

        try {
            const res = await fetch(`${backend_api}/shorturls`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Something went wrong');
            }

            const response = await res.json();

            const updated = [...forms];
            updated[index].result = response;
            updated[index].error = null;
            setForms(updated);
        } catch (err) {
            const updated = [...forms];
            updated[index].error = err.message;
            updated[index].result = null;
            setForms(updated);
        }
    };

    const addMore = () => {
        if (forms.length < 5) {
            setForms([...forms, { url: '', validity: '', shortcode: '', result: null, error: null }]);
        }
    };

    return (
        <div style={{ margin: 'auto', width: '80%' }}>
            <h2 style={{ textAlign: 'center'}}>URL Shortener</h2>

            {forms.map((form, index) => (
                <div key={index}>
                    <h4>URL #{index + 1}</h4>

                    <label>Original Long URL:</label><br />
                    <input
                        type="text"
                        value={form.url}
                        onChange={(e) => handleChange(index, 'url', e.target.value)}
                    /><br /><br />

                    <label>Validity (minutes):</label><br />
                    <input
                        type="number"
                        value={form.validity}
                        onChange={(e) => handleChange(index, 'validity', e.target.value)}
                    /><br /><br />

                    <label>Preferred Shortcode (optional):</label><br />
                    <input
                        type="text"
                        value={form.shortcode}
                        onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
                    /><br /><br />

                    <button onClick={() => handleSubmit(index)}>Shorten</button><br />

                    {form.result && (
                        <div>
                            <p><strong>Short URL:</strong> {form.result.shortLink}</p>
                            <p><strong>Expires At:</strong> {form.result.expiry}</p>
                        </div>
                    )}

                    {form.error && (
                        <p style={{ color: 'red' }}>{form.error}</p>
                    )}

                    <hr />
                </div>
            ))}

            {forms.length < 5 && (
                <button onClick={addMore}>Add Another URL</button>
            )}
        </div>
    );
};

export default UrlShortenerForm;
