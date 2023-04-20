export default function Registration() {
return (
    <div className="form-container">
        <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Submit</button>
        </form>
    </div>
)
}