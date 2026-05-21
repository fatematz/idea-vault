

const NewIdeasPage = () => {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '80px 20px' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{ 
            display: 'inline-block', 
            backgroundColor: '#C6D62E', 
            color: '#000000', 
            padding: '4px 16px', 
            borderRadius: '20px', 
            fontWeight: 'bold', 
            fontSize: '12px', 
            textTransform: 'uppercase', 
            letterSpacing: '2px', 
            marginBottom: '24px' 
          }}>
            Testimonial
          </span>
          <h2 style={{ fontSize: '48px', fontWeight: '800', color: '#000000', lineHeight: '1.1', marginBottom: '16px' }}>
            WHAT OUR CLIENTS THINK<br /> 
            <span style={{ color: '#9ca3af' }}>ABOUT OUR SERVICES.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          
          <div style={{ backgroundColor: '#C6D62E', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', opacity: '0.7', marginBottom: '24px' }}>CUSTOMER STORIES</h3>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#000000', marginBottom: '32px' }}>"I use IdeaVault to help me succeed"</p>
            <p style={{ fontWeight: '600', color: '#000000' }}>— Adam Smith</p>
          </div>

          <div style={{ backgroundColor: '#C6D62E', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#000000', opacity: '0.7', marginBottom: '24px' }}>FACTS & NUMBERS</h3>
            <div style={{ fontSize: '64px', fontWeight: '900', color: '#000000', marginBottom: '8px' }}>89.5%</div>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#000000' }}>OF CUSTOMERS RECOMMEND SERVICES</p>
          </div>

          <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '40px', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', marginBottom: '24px' }}>CUSTOMER STORIES →</h3>
            <p style={{ color: '#374151', marginTop: '60px' }}>Transforming Business Growth: How Just Dabao foe Strategic Investment.</p>
          </div>

          <div style={{ backgroundColor: '#f3f4f6', padding: '40px', borderRadius: '24px', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#6b7280', marginBottom: '24px' }}>REVIEW</h3>
            <p style={{ fontSize: '20px', color: '#1f2937', lineHeight: '1.6', marginBottom: '24px' }}>
              "We couldn't believe the difference IdeaVault made in our day-to-day operations. It's a game-changer!"
            </p>
            <p style={{ color: '#000000', fontWeight: 'bold' }}>Alex Heals, CEO of Interfacts</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewIdeasPage;