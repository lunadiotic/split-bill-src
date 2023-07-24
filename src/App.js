import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Budi",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sukma",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Parjo",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((showAddFriend) => !showAddFriend);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(
      friends.map((friend) => {
        if (friend.id === selectedFriend?.id) {
          return {
            ...friend,
            balance: friend.balance + value,
          };
        }
        return friend;
      })
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelected={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Tutup" : "Tambah Teman"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelected, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend, index) => (
        <Friend
          key={index}
          friend={friend}
          onSelected={onSelected}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelected, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt="" />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          Kamu berhutan Rp{Math.abs(friend.balance)} ke {friend.name}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} berhutang Rp{Math.abs(friend.balance)} ke kamu
        </p>
      )}
      {friend.balance === 0 && <p>Kamu dan {friend.name} tidak ada hutang</p>}
      <Button onClick={() => onSelected(friend)}>
        {isSelected ? "Tutup" : "Pilih"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("");
  }

  return (
    <form action="" className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="">🙎🏼Nama</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="">📸Gambar</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Tambah</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [amount, setAmount] = useState("");
  const [bill, setBill] = useState("");
  const friendBill = amount ? amount - bill : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!amount || !bill) return;
    onSplitBill(whoIsPaying === "user" ? friendBill : -bill);
  }

  return (
    <form action="" className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Patungan bareng {selectedFriend.name}</h2>

      <label htmlFor="">💵 Total Biaya</label>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <label htmlFor="">🙋🏼‍♂️Pengeluaran Kamu</label>
      <input
        type="text"
        value={bill}
        onChange={(e) =>
          setBill(
            Number(e.target.value) > amount ? bill : Number(e.target.value)
          )
        }
      />

      <label htmlFor="">🙋🏼Pengeluaran {selectedFriend.name}</label>
      <input type="text" disabled value={friendBill} />

      <label htmlFor="">🤑 Ditalangin sama</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">Kamu</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Tambah</Button>
    </form>
  );
}
