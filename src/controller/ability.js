import { supabase } from "../db/supabase.js";

// GET - Ambil semua ability
export const getAllAbility = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("ability")
      .select("*")
      .order('id', { ascending: true });

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};

// GET - Ambil ability by ID
export const getAbilityById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("ability")
      .select("*")
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        error: "Ability not found"
      });
    }

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};

// POST - Tambah ability baru
export const createAbility = async (req, res) => {
  try {
    const { name, description, tier, stat_id, stat_effect } = req.body;

    // Validasi
    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Name is required"
      });
    }

    const { data, error } = await supabase
      .from("ability")
      .insert([
        {
          name: name,
          description: description || '',
          tier: tier || '',
          stat_id: stat_id || '',
          stat_effect: stat_effect || ''
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
      message: "Ability created successfully",
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

// PUT - Update ability
export const updateAbility = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, tier, stat_id, stat_effect } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (tier !== undefined) updateData.tier = tier;
    if (stat_id !== undefined) updateData.stat_id = stat_id;
    if (stat_effect !== undefined) updateData.stat_effect = stat_effect;

    const { data, error } = await supabase
      .from("ability")
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
        error: "Ability not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Ability updated successfully",
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

// DELETE - Hapus ability
export const deleteAbility = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("ability")
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
        error: "Ability not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Ability deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message
    });
  }
};
