const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend, index) => (
        <Friend key={index} friend={friend} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt="" />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} Rp{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You owe {friend.name} Rp{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form action="" className="form-add-friend">
      <label htmlFor="">🙎🏼 Name</label>
      <input type="text" />

      <label htmlFor="">📸 Image URL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  )
}


function FormSplitBill() {
  return (
    <form action="" className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label htmlFor="">💵 Bill value</label>
      <input type="text" />

      <label htmlFor="">🙋🏼‍♂️Your expanse</label>
      <input type="text" />

      <label htmlFor="">🙋🏼 X's expanse</label>
      <input type="text" disabled />

      <label htmlFor="">🤑 Who is paying the bill</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Add</Button>
    </form>
  )
}

function Button({ children }) {
  return <button className="button">{children}</button>
}

