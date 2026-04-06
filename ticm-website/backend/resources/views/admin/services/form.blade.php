@csrf

<div class="form-group">
    <label for="title">Titre</label>
    <input type="text" name="title" id="title" value="{{ old('title', $service->title ?? '') }}" required>
</div>

<div class="form-group">
    <label for="slug">Slug / URL</label>
    <input type="text" name="slug" id="slug" value="{{ old('slug', $service->slug ?? '') }}" required>
</div>

<div class="form-group">
    <label for="summary">Résumé</label>
    <textarea name="summary" id="summary">{{ old('summary', $service->summary ?? '') }}</textarea>
</div>

<div class="form-group">
    <label for="content">Détails</label>
    <textarea name="content" id="content">{{ old('content', $service->content ?? '') }}</textarea>
</div>

<div class="form-group">
    <label for="icon">Icone (classe CSS / SVG)</label>
    <input type="text" name="icon" id="icon" value="{{ old('icon', $service->icon ?? '') }}">
</div>

<div class="form-group">
    <label for="order_index">Ordre</label>
    <input type="number" name="order_index" id="order_index" value="{{ old('order_index', $service->order_index ?? 1) }}" min="1">
</div>

<div class="form-group">
    <label for="is_active">Activé</label>
    <select name="is_active" id="is_active">
        <option value="1" {{ old('is_active', ($service->is_active ?? 1)) ? 'selected' : '' }}>Oui</option>
        <option value="0" {{ !old('is_active', ($service->is_active ?? 1)) ? 'selected' : '' }}>Non</option>
    </select>
</div>

<button type="submit" class="button button-primary">Enregistrer</button>
