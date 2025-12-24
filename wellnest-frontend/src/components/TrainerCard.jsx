import React, { useState } from 'react';
import { FiStar, FiMapPin, FiPhone, FiMail, FiCopy, FiCheck } from 'react-icons/fi';

const TrainerCard = ({ trainer }) => {
    const [copiedField, setCopiedField] = useState(null);

    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="trainer-card" style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transition: 'all 0.2s',
            height: '100%',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <img
                    src={trainer.image}
                    alt={trainer.name}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #e0f2fe'
                    }}
                />
                <div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '18px', color: '#0f172a', fontWeight: 700 }}>{trainer.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#64748b' }}>
                        <FiStar style={{ fill: '#eab308', color: '#eab308' }} /> {trainer.rating}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                        <FiMapPin /> {trainer.location}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {trainer.specialties.map(spec => (
                    <span key={spec} style={{
                        fontSize: '12px',
                        background: '#f1f5f9',
                        color: '#475569',
                        fontWeight: 500,
                        padding: '4px 10px',
                        borderRadius: '99px',
                    }}>
                        {spec}
                    </span>
                ))}
            </div>

            <p style={{ margin: 0, fontSize: '14px', color: '#475569', lineHeight: '1.6', flex: 1 }}>
                {trainer.bio}
            </p>

            <div style={{
                paddingTop: '16px',
                borderTop: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {/* Email Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ padding: 8, background: '#eff6ff', borderRadius: 8, display: 'flex' }}>
                            <FiMail style={{ color: '#2563eb' }} />
                        </div>
                        <span>{trainer.email}</span>
                    </div>
                    <button
                        onClick={() => handleCopy(trainer.email, 'email')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copiedField === 'email' ? '#16a34a' : '#64748b' }}
                        title="Copy Email"
                    >
                        {copiedField === 'email' ? <FiCheck /> : <FiCopy />}
                    </button>
                </div>

                {/* Phone Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: '#334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ padding: 8, background: '#eff6ff', borderRadius: 8, display: 'flex' }}>
                            <FiPhone style={{ color: '#2563eb' }} />
                        </div>
                        <span>{trainer.phone}</span>
                    </div>
                    <button
                        onClick={() => handleCopy(trainer.phone, 'phone')}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: copiedField === 'phone' ? '#16a34a' : '#64748b' }}
                        title="Copy Phone"
                    >
                        {copiedField === 'phone' ? <FiCheck /> : <FiCopy />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrainerCard;
