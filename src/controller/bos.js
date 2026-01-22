import { supabase } from "../db/supabase.js";

// GET - Ambil semua boss
export const getAllBos = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("bosdef")
      .select("id, name, type, image_url, spawn, element, stat")
      .order('id', { ascending: true });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data: data.map(boss => ({
        id: boss.id,
        nama: boss.name,
        type: boss.type,
        image: boss.image_url,
        location: boss.spawn,
        element: boss.element,
        stat: boss.stat
      }))
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};

// GET - Ambil boss by ID
export const getBosById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("bosdef")
      .select("id, name, type, image_url, spawn, element, stat")
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        error: "Boss not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: data.id,
        nama: data.name,
        type: data.type,
        image: data.image_url,
        location: data.spawn,
        element: data.element,
        stat: data.stat
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};

// POST - Tambah boss baru
export const createBos = async (req, res) => {
  try {
    const { nama, type, image, location, element, stat } = req.body;

    // Validasi
    if (!nama || !type || !location || !element) {
      return res.status(400).json({
        success: false,
        error: "Name, type, location, and element are required"
      });
    }

    const { data, error } = await supabase
      .from("bosdef")
      .insert([
        {
          name: nama,
          type: type,
          image_url: image || '',
          spawn: location,
          element: element,
          stat: stat || ''
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(201).json({
      success: true,
      message: "Boss created successfully",
      data: data[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};

// PUT - Update boss
export const updateBos = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, type, image, location, element, stat } = req.body;

    const updateData = {};
    if (nama) updateData.name = nama;
    if (type) updateData.type = type;
    if (image !== undefined) updateData.image_url = image;
    if (location) updateData.spawn = location;
    if (element) updateData.element = element;
    if (stat !== undefined) updateData.stat = stat;

    const { data, error } = await supabase
      .from("bosdef")
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Boss not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Boss updated successfully",
      data: data[0]
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};

// DELETE - Hapus boss
export const deleteBos = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("bosdef")
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Boss not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Boss deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};
