'use client';
import { useState, useEffect } from 'react';

const AddStudentToWorkshop = () => {
  const [students, setStudents] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState('');
  const [message, setMessage] = useState('');

  // Buscar alunos e workshops do backend
  useEffect(() => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => setStudents(data));

    fetch('/api/workshops')
      .then(res => res.json())
      .then(data => setWorkshops(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/workshops/add-student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: Number(selectedStudent),
        workshopId: Number(selectedWorkshop),
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage('Aluno adicionado ao workshop com sucesso!');
    } else {
      setMessage(`Erro: ${result.error}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Adicionar Aluno ao Workshop</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Selecione o Aluno:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">Escolha um aluno</option>
            {students.map((student: any) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Selecione o Workshop:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={selectedWorkshop}
            onChange={(e) => setSelectedWorkshop(e.target.value)}
            required
          >
            <option value="">Escolha um workshop</option>
            {workshops.map((workshop: any) => (
              <option key={workshop.id} value={workshop.id}>
                {workshop.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </form>

      {message && (
        <div className="mt-4 p-2 bg-green-100 border border-green-300 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default AddStudentToWorkshop;