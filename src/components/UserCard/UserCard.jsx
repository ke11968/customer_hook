const UserCard = ({ user }) => {
  return (
    <article className="user-card">
      <img className="user-card__image" src={user.image} alt={user.firstName} />
      <h3 className="user-card__name">
        {user.firstName} {user.lastName}
      </h3>
      <p className="user-card__field">Age: {user.age}</p>
      <p className="user-card__field">Email: {user.email}</p>
      <p className="user-card__field">Phone: {user.phone}</p>
    </article>
  );
};

export default UserCard;
