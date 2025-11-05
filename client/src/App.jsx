import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getUsers, createUser, updateUser, deleteUser } from './modules/user/user.controller'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({
    id: null,
    fullName: '',
    email: '',
    phoneNumber: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (error) {
      console.error('Error cargando usuarios:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        await updateUser(formData.id, formData)
      } else {
        await createUser(formData)
      }
      resetForm()
      loadUsers()
    } catch (error) {
      console.error('Error guardando usuario:', error)
    }
  }

  const handleEdit = (user) => {
    setFormData(user)
    setIsEditing(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await deleteUser(id)
        loadUsers()
      } catch (error) {
        console.error('Error eliminando usuario:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      id: null,
      fullName: '',
      email: '',
      phoneNumber: ''
    })
    setIsEditing(false)
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">SGU - Sistema de Gestión de Usuarios</span>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <h5>{isEditing ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Número de Teléfono</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                      {isEditing ? 'Actualizar' : 'Guardar'}
                    </button>
                    {isEditing && (
                      <button type="button" className="btn btn-secondary" onClick={resetForm}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5>Lista de Usuarios</h5>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre Completo</th>
                      <th>Correo Electrónico</th>
                      <th>Teléfono</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(user)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(user.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
