export default function Input({ label, id, initialValue, ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required defaultValue={initialValue} {...props} />
    </p>
  );
}
